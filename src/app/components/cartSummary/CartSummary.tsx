"use client";

import { useEffect, useState } from "react";

import { Product, CartTotalResponse } from "@/app/types/cart";
import { useCart } from "@/app/contexts/useCart";
import { useUserType } from "@/app/contexts/useUserType";
import { formatCurrency } from "@/app/utils/formatCurrency/formatCurrency";

enum Promotion {
  vipPercent = "VIP 15% discount",
  get3For2 = "Get 3 for 2",
}

export default function CartSummary({ products }: { products: Product[] }) {
  const { cart } = useCart();
  const { userType } = useUserType();

  const [promoData, setPromoData] = useState<CartTotalResponse | null>(null);
  const [selectedPromo, setSelectedPromo] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPromo() {
      if (cart.length === 0) return;

      const res = await fetch("/api/cart/total", {
        method: "POST",
        body: JSON.stringify({
          cart,
          userType: userType,
        }),
      });
      const data = await res.json();
      setPromoData(data);
      setSelectedPromo(data.promotion);
    }

    fetchPromo();
  }, [cart, userType]);

  const handleSelectPromo = (promo: string) => {
    setSelectedPromo(promo);
  };

  const getPromoPrice = () => {
    if (!promoData) return 0;
    if (selectedPromo === Promotion.vipPercent)
      return promoData.details.totalVIP;
    if (selectedPromo === Promotion.get3For2)
      return promoData.details.totalPromo;
    return promoData.details.totalGross;
  };

  if (!promoData) return null;

  return (
    <aside className="w-full lg:w-1/4 bg-white p-6 shadow-md space-y-4">
      <h2 className="text-xl font-bold mb-2">Cart Summary</h2>

      <ul className="space-y-2">
        {cart.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return (
            <li key={item.productId} className="flex justify-between text-sm">
              <span>
                {product?.name || "Product"} x {item.quantity}
              </span>
              <span>
                {formatCurrency((product?.price || 0) * item.quantity)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Choose your promotion:</h3>
        {userType === "vip" && (
          <>
            <label className="flex items-center mb-1">
              <input
                type="radio"
                checked={selectedPromo === Promotion.vipPercent}
                onChange={() => handleSelectPromo(Promotion.vipPercent)}
              />
              <span className="ml-2">
                VIP 15% discount – {formatCurrency(promoData.details.totalVIP)}
              </span>
            </label>
            <label className="flex items-center mb-1">
              <input
                type="radio"
                checked={selectedPromo === Promotion.get3For2}
                onChange={() => handleSelectPromo(Promotion.get3For2)}
              />
              <span className="ml-2">
                Get 3 for 2 – {formatCurrency(promoData.details.totalPromo)}
              </span>
            </label>
          </>
        )}
        {userType === "common" && (
          <p>
            Promo: <strong>{promoData.promotion}</strong> –{" "}
            {formatCurrency(promoData.total)}
          </p>
        )}
      </div>

      <div className="mt-4 text-lg font-bold flex justify-between">
        <span>Total:</span>
        <span>{formatCurrency(getPromoPrice())}</span>
      </div>

      <button
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={() => alert("Finalizar compra")}
      >
        Finalize Purchase
      </button>
    </aside>
  );
}
