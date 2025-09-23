"use client";
import React, { useState } from "react";
import trendz from "@/../public/images/trendz.png";
import ProductCard from "./ProductCard";
import Categories from "./Categories";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

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

type SortOrder = "asc" | "desc";

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Filter products by category
  const filteredProducts =
    activeCategory === "All"
      ? productItems
      : productItems.filter((product) => product.category === activeCategory);

  // Sort filtered products by price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const comparison = a.price - b.price;
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <section className="w-full h-full my-10">
      <Categories
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Sort */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">Sort by Price:</span>
          <button
            onClick={toggleSortOrder}
            className="flex items-center gap-2 px-4 py-1 bg-[#e8a812] text-white rounded-lg hover:bg-[#d49610] transition-colors"
          >
            <span className="flex items-center">
              {sortOrder === "asc" ? "asc" : "desc"}
            </span>
            {sortOrder === "asc" ? (
              <ChevronUpIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500">
          {activeCategory === "All"
            ? `Showing ${sortedProducts.length} products`
            : `Showing ${
                sortedProducts.length
              } ${activeCategory.toLowerCase()}`}
        </div>
      </div>

      {/* Featured Products */}

      <div className="w-full grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">
              No products found in {activeCategory}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
