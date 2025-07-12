// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import ProductCard, {
  ProductCardProps,
} from "@/app/components/productCard/ProductCard";
import { getProducts } from "@/app/lib/api";
import { useCart } from "@/app/contexts/useCart";
import CartSidebar from "@/app/components/cartSidebar/CartSidebar";
import CartSummary from "@/app/components/cartSummary/CartSummary";

export default function HomePage() {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col lg:flex-row">
      <section className="w-full lg:w-3/4 py-10 bg-gray-100">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => addToCart(product.id)}
            />
          ))}
        </div>
      </section>

      <CartSidebar
        cart={cart}
        products={products}
        removeFromCart={removeFromCart}
      />
      <CartSummary products={products} />
    </div>
  );
}
