import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/interfaces";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(`Product ${productId} added to cart`);
  };
  return (
    <>
      <Link
        href={`/products/${product.name.replace(/\s+/g, "-").toLowerCase()}/`}
        className="bg-[#e8a812]/2 p-4 flex flex-col gap-2 shadow-md rounded-2xl"
        key={product.id}
      >
        <Image
          src={product.image}
          alt="Alt text here"
          className="object-cover w-full h-60"
        />

        {product.discount && (
          <div className="flex gap-1 items-center">
            <p className="text-[13px] text-white bg-[#42121b] px-1 py-0.5 rounded-md">
              {product.discount}% off
            </p>
            <p className="text-[13px] text-[#42121b]">Time limited deal</p>
          </div>
        )}

        <h3 className="font-bold">{product.name}</h3>
        <p className="text-[14px]">{product.description}</p>
        <div className="flex justify-between items-center gap-4">
          {/* <p className="font-bold text-[#42121b]">${product.price}</p> */}
          <div className="flex flex-col">
            {product.discount ? (
              <>
                <p className="font-bold text-[#42121b]">
                  $
                  {(
                    product.price -
                    (product.price * product.discount) / 100
                  ).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="font-bold text-[#42121b]">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>
          {/* Add to cart button */}
          <button
            onClick={(e) => handleAddToCart(e, product.id)}
            className="cursor-pointer flex gap-1 items-center shadow-md px-1.5 py-1 rounded-md"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            <span className="text-[14px]">Add to Cart</span>
          </button>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
