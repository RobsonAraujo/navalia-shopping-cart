"use client";

import { useEffect, useState } from "react";
import { Product, CartTotalResponse } from "@/app/types/cart";
import { useCart } from "@/app/contexts/useCart";
import { useUserType } from "@/app/contexts/useUserType";
import { formatCurrency } from "@/app/utils/formatCurrency/formatCurrency";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Divider,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

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

  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0) return;
    async function fetchPromo() {
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

  const handleSelectPromo = (promo: Promotion) => setSelectedPromo(promo);

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

  if (!promoData || cart.length === 0) return null;

  return (
    <aside className="w-full lg:w-1/4 bg-white p-6 shadow-xl rounded-xl space-y-5 border border-lightGrey">
      <Typography variant="h6" className="text-gray-800 font-semibold mb-4">
        🛒 Cart Summary
      </Typography>

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

      <Divider sx={{ my: 2 }} />

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
        <Typography
          variant="subtitle1"
          className="font-semibold text-blue-800 mb-2"
        >
          Choose your promotion:
        </Typography>

        {userType === "vip" && (
          <FormControl component="fieldset" className="space-y-4">
            <RadioGroup
              value={selectedPromo}
              onChange={(e) => handleSelectPromo(e.target.value as Promotion)}
            >
              <FormControlLabel
                value={Promotion.VIP}
                control={<Radio />}
                label={
                  <div className="flex flex-col p-3 border border-lightGrey bg-white rounded-lg shadow-sm transition-all hover:bg-blue-50">
                    <Typography
                      variant="body2"
                      className="font-medium text-gray-800"
                    >
                      🎉 {Promotion.VIP}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-xs text-green-700"
                    >
                      You save{" "}
                      {formatCurrency(
                        promoData.details.totalGross -
                          promoData.details.totalVIP
                      )}
                    </Typography>
                  </div>
                }
                className="mb-2"
              />

              {totalItemsInCart >= 3 && (
                <FormControlLabel
                  value={Promotion.GET_3_FOR_2}
                  control={<Radio />}
                  label={
                    <div className="flex flex-col p-3 border bg-white border-lightGrey rounded-lg shadow-sm transition-all hover:bg-blue-50">
                      <Typography
                        variant="body2"
                        className="font-medium text-gray-800"
                      >
                        🎉 {Promotion.GET_3_FOR_2}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-xs text-green-700"
                      >
                        You save{" "}
                        {formatCurrency(
                          promoData.details.totalGross -
                            promoData.details.totalPromo
                        )}
                      </Typography>
                    </div>
                  }
                  className="mb-2"
                />
              )}
            </RadioGroup>
          </FormControl>
        )}

        {userType === "common" && totalItemsInCart >= 3 && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-md">
            <Typography
              variant="body2"
              className="text-green-800 font-semibold"
            >
              🎉 Promotion Applied:{" "}
              <span className="underline">{promoData.promotion}</span>
            </Typography>
            <Typography variant="body2" className="text-xs text-green-700">
              You are saving {formatCurrency(totalSaved)}
            </Typography>
          </div>
        )}

        {userType === "common" && totalItemsInCart < 3 && (
          <Typography variant="body2" className="text-gray-600 mt-2">
            Add {3 - totalItemsInCart} more item
            {3 - totalItemsInCart > 1 ? "s" : ""} to unlock promotions!
          </Typography>
        )}
      </div>

      <div className="mt-4 text-lg font-bold flex justify-between text-gray-800">
        <span>Total:</span>
        <span className="text-blue-700">{formatCurrency(getPromoPrice())}</span>
      </div>

      <Button
        variant="contained"
        color="primary"
        className="w-full py-2 px-4 mt-4"
        onClick={() => {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }}
        startIcon={<CheckIcon />}
      >
        Finalize Purchase
      </Button>

      {showSuccess && (
        <div className="mt-4 bg-green-100 border border-green-300 text-green-800 p-3 rounded-md text-sm animate-fade-in">
          Purchase successfully completed! 🎉
        </div>
      )}
    </aside>
  );
}
