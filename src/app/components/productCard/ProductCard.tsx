"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/app/types/cart";
import Button from "../button/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Typography } from "@mui/material";

export interface ProductCardProps extends Product {
  onAddToCart?: () => void;
}

export default function ProductCard({
  name,
  price,
  image,
  location = "Unknown",
  rating = null,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <div className="relative flex items-end overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className="object-cover w-full h-48"
        />

        {rating && (
          <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-slate-400">{rating}</span>
          </div>
        )}
      </div>

      <div className="mt-1 p-2">
        <Typography variant="h6" className="text-slate-700">
          {name}
        </Typography>

        <Typography className="mt-1 text-sm text-slate-400">
          {location}
        </Typography>

        <div className="mt-3 flex items-end justify-between">
          <Typography variant="h6" color="blue">
            ${price}
          </Typography>

          <Button
            variant="contained"
            color="blue"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.();
            }}
            startIcon={<AddShoppingCartIcon />}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
