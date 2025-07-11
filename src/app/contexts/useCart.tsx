"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "@/app/types/cart";

type CartContextType = {
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(productId: string, quantity: number = 1) {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
