"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import trendz from "@/../public/images/trendz.png";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import ProductCard from "@/components/products/ProductCard";

const productItems = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    discount: 10,
    image: trendz,
    category: "T-Shirts",
    description:
      "Comfortable and stylish cotton t-shirt perfect for everyday wear.",
  },
  {
    id: 2,
    name: "Cozy Winter Hoodie",
    price: 39.99,
    discount: 15,
    image: trendz,
    category: "Hoodies",
    description: "Another great product with amazing features.",
  },
  {
    id: 3,
    name: "Product 3",
    price: 49.99,
    image: trendz,
    category: "Dresses",
    description: "Premium quality product for discerning customers.",
  },
  {
    id: 4,
    name: "Evening Dress",
    price: 49.99,
    image: trendz,
    category: "Dresses",
    description: "Premium quality product for discerning customers.",
  },
  {
    id: 5,
    name: "Sports Hoodie",
    price: 49.99,
    image: trendz,
    category: "Hoodies",
    description: "Athletic hoodie perfect for workouts.",
  },
  {
    id: 6,
    name: "Designer Handbag",
    price: 149.99,
    image: trendz,
    category: "Bags",
    description: "Stylish handbag for modern women.",
  },
  {
    id: 7,
    name: "Casual Cotton T-Shirt",
    price: 49.99,
    image: trendz,
    category: "T-Shirts",
    description: "Premium quality product for discerning customers.",
  },
  {
    id: 8,
    name: "Elegant Summer Dress",
    price: 79.99,
    image: trendz,
    category: "Dresses",
    description: "Beautiful dress perfect for summer occasions.",
  },
];

const ProductDetails = () => {
  const params = useParams();
  const { productId } = params;

  // Find the product by matching the slug with the product name
  const product = productItems.find((item) => {
    const productSlug = item.name.replace(/\s+/g, "-").toLowerCase();
    return productSlug === productId;
  });

  // Handle case where product is not found
  if (!product) {
    return (
      <section className="py-4 px-10 w-full h-full">
        <div className="flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">
              Product Not Found
            </h1>
            <p className="text-gray-600 mt-2">
              The product with ID {productId} does not exist.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const handleAddToCart = () => {
    console.log(`Added ${product.name} to cart`);
    // Add your cart logic here
  };

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <section className="py-8 px-10 w-full h-full">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 shadow-xl bg-[#e8a812]/2 rounded-md p-6 sm:w-4/5 mx-auto">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product Information */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Brand: {product.description.slice(0, 20)}...
            </p>
            <hr className="w-full border-1 border-[#e8a812]" />
          </div>

          {/* Price Section */}
          <div className="space-y-2">
            {product.discount ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#42121b]">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-white bg-[#42121b] px-2 py-1 rounded-md">
                  {product.discount}% OFF
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-[#42121b]">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-[#e8a812] hover:bg-[#d49610] text-white font-semibold px-6 py-3 rounded-lg transition-colors sm:mt-10 mt-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>
      {/* Additional product details could go here */}
      <div className="py-10 sm:px-10 px-4 rounded-lg">
        <h4 className="font-semibold mb-2">Product Features</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• High quality materials</li>
          <li>• Free shipping on orders over $50</li>
          <li>• 30-day return policy</li>
        </ul>
      </div>

      {/* List other products */}
      <div className="">
        <h1 className="font-semibold text-2xl">Browse other products</h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-8 gap-4">
          {productItems.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
