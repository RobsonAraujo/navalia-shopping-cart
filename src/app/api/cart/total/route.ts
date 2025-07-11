import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client.js";

const prisma = new PrismaClient();

type CartItemInput = {
  productId: string;
  quantity: number;
};

type UserType = "vip" | "common";

type RequestBody = {
  cart: CartItemInput[];
  userType: UserType;
};

function isValidUserType(type: string): type is UserType {
  return type === "vip" || type === "common";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const { cart, userType } = body;

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    if (!isValidUserType(userType)) {
      return NextResponse.json(
        { error: "Invalid user type." },
        { status: 400 }
      );
    }

    const productIds = cart.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productPriceMap: Record<string, number> = Object.fromEntries(
      products.map((p) => [p.id, Number(p.price)])
    );

    const expandedCart = cart.flatMap(({ productId, quantity }) => {
      const price = productPriceMap[productId];
      if (!price) return [];
      return Array(quantity).fill({ productId, price });
    });

    const totalGross = expandedCart.reduce((sum, item) => sum + item.price, 0);

    const sortedByPrice = [...expandedCart].sort((a, b) => a.price - b.price);
    const freeItemCount = Math.floor(sortedByPrice.length / 3);
    const promoDiscount = sortedByPrice
      .slice(0, freeItemCount)
      .reduce((sum, item) => sum + item.price, 0);
    const totalWithPromo = totalGross - promoDiscount;

    const totalWithVip = totalGross * 0.85;

    let finalTotal = totalWithPromo;
    let promotion: UserType | string = "Get 3 for 2";

    if (userType === "vip" && totalWithVip < totalWithPromo) {
      finalTotal = totalWithVip;
      promotion = "VIP 15% discount";
    }

    return NextResponse.json({
      total: +finalTotal.toFixed(2),
      promotion,
      recommendation: promotion,
      details: {
        totalGross: +totalGross.toFixed(2),
        totalPromo: +totalWithPromo.toFixed(2),
        totalVIP: +totalWithVip.toFixed(2),
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: productPriceMap[item.productId] ?? 0,
        })),
      },
    });
  } catch (error) {
    console.error("[POST /cart/total]", error);
    return NextResponse.json(
      { error: "Error calculating cart total." },
      { status: 500 }
    );
  }
}
