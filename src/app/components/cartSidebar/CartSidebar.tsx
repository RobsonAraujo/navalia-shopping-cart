"use client";

import React from "react";
import { CartItem } from "@/app/types/cart";
import { Product } from "@/app/types/cart";

interface CartSidebarProps {
  cart: CartItem[];
  products: Product[];
}

export default function CartSidebar({ cart, products }: CartSidebarProps) {
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
              <li key={item.productId} className="flex justify-between">
                <span>
                  {product?.name || "Product"} x {item.quantity}
                </span>
                <span className="font-semibold">
                  ${((product?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
