"use client";

import React from "react";
import { CartItem } from "@/app/types/cart";
import { Product } from "@/app/types/cart";
import { formatCurrency } from "@/app/utils/formatCurrency/formatCurrency";

interface CartSidebarProps {
  cart: CartItem[];
  products: Product[];
  removeFromCart: (productId: string) => void;
}

export default function CartSidebar({
  cart,
  products,
  removeFromCart,
}: CartSidebarProps) {
  return (
    <aside className="w-full lg:w-1/4 bg-white p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return (
              <li
                key={item.productId}
                className="flex justify-between items-center"
              >
                <span>
                  {product?.name || "Product"} x {item.quantity}
                </span>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    {formatCurrency((product?.price || 0) * item.quantity)}
                  </span>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-600 hover:text-red-800 text-sm"
                    aria-label={`Remove ${
                      product?.name || "product"
                    } from cart`}
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
