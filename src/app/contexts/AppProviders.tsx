"use client";

import { ReactNode } from "react";
import { CartProvider } from "./useCart";
import { UserTypeProvider } from "./useUserType";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <UserTypeProvider>{children}</UserTypeProvider>
    </CartProvider>
  );
}
