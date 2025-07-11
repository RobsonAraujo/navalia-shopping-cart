import {
  CartItem,
  CartTotalResponse,
  Product,
  UserType,
} from "@/app/types/cart";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Error searching for products");
  return res.json();
}

export async function calculateCartTotal(
  cart: CartItem[],
  userType: UserType
): Promise<CartTotalResponse> {
  const res = await fetch("/api/cart/total", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart, userType }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Error calculating cart total");
  }

  return res.json();
}
