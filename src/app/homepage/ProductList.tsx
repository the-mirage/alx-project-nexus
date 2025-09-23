import Image from "next/image";
import React from "react";
import trendz from "@/../public/images/trendz.png";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Categories = () => {
  return (
    <ul className="flex justify-around gap-4 bg-[#e8a812]/8 rounded-md py-1 mb-4">
      <li className="cursor-pointer text-gray-600 focus:text-black focus:bg-[e8a812]/30">
        All
      </li>
      <li className="cursor-pointer text-gray-600 focus:text-black focus:bg-[e8a812]/30">
        T-Shirts
      </li>
      <li className="cursor-pointer text-gray-600 focus:text-black focus:bg-[e8a812]/30">
        Hoodies
      </li>
      <li className="cursor-pointer text-gray-600 focus:text-black focus:bg-[e8a812]/30">
        Dresses
      </li>
      <li className="cursor-pointer text-gray-600 focus:text-black focus:bg-[e8a812]/30">
        Bags
      </li>
    </ul>
  );
};

const productItems = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    discount: 10,
    image: trendz,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const ProductList = () => {
  return (
    <section className="w-full h-full my-10">
      <Categories />

      {/* Sort */}

      {/* Featured Products */}

      <div className="w-full grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4">
        {productItems.map((product) => (
          <div
            className="bg-[#e8a812]/2 p-4 flex flex-col gap-2 shadow-md rounded-2xl"
            key={product.id}
          >
            <Image
              src={product.image}
              alt="Alt text here"
              className="object-cover"
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
              <p className="font-bold text-[#42121b]">${product.price}</p>
              <button className="cursor-pointer flex gap-1 items-center shadow-md px-1.5 py-1 rounded-md">
                <ShoppingCartIcon className="h-4 w-4" />
                <span className="text-[14px]">Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
