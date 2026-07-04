"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "./CartContext";

/**
 * ExampleProductCard
 * Shows how any product card in your grid would call `addItem` to push
 * a product into the shared cart — this is what feeds the CartButton
 * badge count and the CartDrawer's review step.
 *
 * This is a reference/example component — wire this pattern into your
 * real product card component (e.g. the "Our Products" grid).
 */

interface ExampleProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ExampleProductCard: React.FC<ExampleProductCardProps> = ({
  id,
  name,
  price,
  image,
}) => {
  const { addItem } = useCart();

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div className="relative h-20 w-20">
        <Image src={image} alt={name} fill className="object-contain" />
      </div>
      <p className="text-sm font-semibold text-gray-900">{name}</p>
      <p className="text-sm text-gray-500">₹{price.toLocaleString("en-IN")}</p>
      <button
        type="button"
        onClick={() => addItem({ id, name, price, image })}
        className="mt-1 w-full rounded-md bg-teal-600 py-2 text-xs font-semibold text-white transition hover:bg-teal-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ExampleProductCard;
