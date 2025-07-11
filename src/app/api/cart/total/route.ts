import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client.js";

const prisma = new PrismaClient();

type CartItemInput = {
  productId: string;
  quantity: number;
};

type UserType = "vip" | "common";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cart, userType }: { cart: CartItemInput[]; userType: UserType } =
      body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Empty Car." }, { status: 400 });
    }

    if (!["vip", "common"].includes(userType)) {
      return NextResponse.json(
        { error: "Invalid user type." },
        { status: 400 }
      );
    }

    const productIds = cart.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = Object.fromEntries(
      products.map((p) => [p.id, Number(p.price)])
    );
    const fullCart = cart.flatMap((item) => {
      const price = productMap[item.productId];
      if (!price) return [];
      return Array(item.quantity).fill({ productId: item.productId, price });
    });

    const totalGross = fullCart.reduce((sum, item) => sum + item.price, 0);

    const sortedItems = [...fullCart].sort((a, b) => a.price - b.price);
    const freeItemCount = Math.floor(sortedItems.length / 3);
    const totalDescontoPromo = sortedItems
      .slice(0, freeItemCount)
      .reduce((sum, item) => sum + item.price, 0);
    const totalPromo = totalGross - totalDescontoPromo;

    const totalVIP = totalGross * 0.85;

    let finalTotal = totalPromo;
    let promotion = "Get 3 for 2";

    if (userType === "vip") {
      if (totalVIP < totalPromo) {
        finalTotal = totalVIP;
        promotion = "VIP 15% discount";
      }
    }

    return NextResponse.json({
      total: Number(finalTotal.toFixed(2)),
      promotion,
      recommendation: promotion,
      details: {
        totalGross: Number(totalGross.toFixed(2)),
        totalPromo: Number(totalPromo.toFixed(2)),
        totalVIP: Number(totalVIP.toFixed(2)),
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: productMap[item.productId] ?? 0,
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
