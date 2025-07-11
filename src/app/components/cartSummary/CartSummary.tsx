"use client";

import { useEffect, useState } from "react";
import { Product, CartTotalResponse } from "@/app/types/cart";
import { useCart } from "@/app/contexts/useCart";
import { useUserType } from "@/app/contexts/useUserType";
import { formatCurrency } from "@/app/utils/formatCurrency/formatCurrency";

enum Promotion {
  VIP = "VIP 15% discount",
  GET_3_FOR_2 = "Get 3 for 2",
}

export default function CartSummary({ products }: { products: Product[] }) {
  const { cart } = useCart();
  const { userType } = useUserType();

  const [promoData, setPromoData] = useState<CartTotalResponse | null>(null);
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Total quantity of items in the cart
  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    async function fetchPromo() {
      if (cart.length === 0) return;
      try {
        const res = await fetch("/api/cart/total", {
          method: "POST",
          body: JSON.stringify({ cart, userType }),
        });
        const data = await res.json();
        setPromoData(data);
        setSelectedPromo(data.promotion);
      } catch (error) {
        console.error("Failed to fetch promotion", error);
      }
    }
    fetchPromo();
  }, [cart, userType]);

  const handleSelectPromo = (promo: Promotion) => {
    setSelectedPromo(promo);
  };

  const getPromoPrice = (): number => {
    if (!promoData) return 0;
    switch (selectedPromo) {
      case Promotion.VIP:
        return promoData.details.totalVIP;
      case Promotion.GET_3_FOR_2:
        return promoData.details.totalPromo;
      default:
        return promoData.details.totalGross;
    }
  };

  const totalSaved = promoData
    ? promoData.details.totalGross - getPromoPrice()
    : 0;

  if (!promoData) return null;

  return (
    <aside className="w-full lg:w-1/4 bg-white p-6 shadow-xl rounded-xl space-y-5 border border-lightGrey">
      <h2 className="text-2xl font-bold text-gray-800">🛒 Cart Summary</h2>

      <ul className="space-y-2 text-sm">
        {cart.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return (
            <li
              key={item.productId}
              className="flex justify-between text-gray-700"
            >
              <span>
                {product?.name || "Product"} x {item.quantity}
              </span>
              <span className="font-medium">
                {formatCurrency((product?.price || 0) * item.quantity)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
        <h3 className="font-semibold text-blue-800 mb-2">
          Choose your promotion:
        </h3>

        {userType === "vip" && (
          <div className="space-y-2">
            {/* VIP Discount always shown */}
            <label
              className={`flex items-center gap-2 p-2 rounded-md border ${
                selectedPromo === Promotion.VIP
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white border-gray-300"
              } cursor-pointer transition-all`}
            >
              <input
                type="radio"
                checked={selectedPromo === Promotion.VIP}
                onChange={() => handleSelectPromo(Promotion.VIP)}
              />
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">
                  {Promotion.VIP}
                </span>
                <span className="text-xs text-green-700">
                  You save{" "}
                  {formatCurrency(
                    promoData.details.totalGross - promoData.details.totalVIP
                  )}
                </span>
              </div>
            </label>

            {/* Get 3 for 2 only if 3 or more items */}
            {totalItemsInCart >= 3 && (
              <label
                className={`flex items-center gap-2 p-2 rounded-md border ${
                  selectedPromo === Promotion.GET_3_FOR_2
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white border-gray-300"
                } cursor-pointer transition-all`}
              >
                <input
                  type="radio"
                  checked={selectedPromo === Promotion.GET_3_FOR_2}
                  onChange={() => handleSelectPromo(Promotion.GET_3_FOR_2)}
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {Promotion.GET_3_FOR_2}
                  </span>
                  <span className="text-xs text-green-700">
                    You save{" "}
                    {formatCurrency(
                      promoData.details.totalGross -
                        promoData.details.totalPromo
                    )}
                  </span>
                </div>
              </label>
            )}
          </div>
        )}

        {userType === "common" && totalItemsInCart >= 3 && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-md">
            <p className="text-sm text-green-800 font-semibold">
              🎉 Promotion Applied:{" "}
              <span className="underline">{promoData.promotion}</span>
            </p>
            <p className="text-xs text-green-700">
              You are saving {formatCurrency(totalSaved)}
            </p>
          </div>
        )}

        {userType === "common" && totalItemsInCart < 3 && (
          <p className="text-gray-600 text-sm mt-2">
            Add {3 - totalItemsInCart} more item
            {3 - totalItemsInCart > 1 ? "s" : ""} to unlock promotions!
          </p>
        )}
      </div>

      <div className="mt-4 text-lg font-bold flex justify-between text-gray-800">
        <span>Total:</span>
        <span className="text-blue-700">{formatCurrency(getPromoPrice())}</span>
      </div>

      <button
        style={{ cursor: "pointer" }}
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        onClick={() => {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }}
      >
        ✅ Finalize Purchase
      </button>

      {showSuccess && (
        <div className="mt-4 bg-green-100 border border-green-300 text-green-800 p-3 rounded-md text-sm animate-fade-in">
          Purchase successfully completed! 🎉
        </div>
      )}
    </aside>
  );
}
