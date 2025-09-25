"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Categories from "./Categories";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useProducts } from "@/stores/productStore";

type SortOrder = "asc" | "desc";

const ProductList = () => {
  const { filteredProducts, isLoading, error, fetchProducts } = useProducts();
  // const { categories, selectedCategory, setSelectedCategory } = useCategories();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Filter products by category
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
