"use client";

import React from "react";
import { CartItem, Product } from "@/app/types/cart";
import { formatCurrency } from "@/app/utils/formatCurrency/formatCurrency";
import { Button, Typography, Divider } from "@mui/material";

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
  const totalAmount = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <aside className="w-full lg:w-1/4 bg-white p-6 shadow-lg rounded-lg">
      <Typography variant="h6" className="mb-4 font-semibold">
        Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          Your cart is empty.
        </Typography>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return (
              <li
                key={item.productId}
                className="flex justify-between items-center py-2"
              >
                <span className="text-sm">
                  {product?.name || "Product"} x {item.quantity}
                </span>
                <div className="flex items-center gap-4">
                  <Typography variant="body1" className="font-semibold">
                    {formatCurrency((product?.price || 0) * item.quantity)}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeFromCart(item.productId)}
                    className="text-sm"
                    aria-label={`Remove ${
                      product?.name || "product"
                    } from cart`}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <Divider sx={{ my: 2 }} />
      {cart.length > 0 && (
        <div className="flex justify-between">
          <Typography variant="body1" className="font-semibold">
            Total:
          </Typography>
          <Typography variant="h6" className="font-semibold">
            {formatCurrency(totalAmount)}
          </Typography>
        </div>
      )}
    </aside>
  );
}
