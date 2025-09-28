"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import Categories from "./Categories";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import { useProductStore } from "@/stores/productStore";

type SortOrder = "asc" | "desc";
const PRODUCTS_PER_PAGE = 20;

const ProductList = () => {
  const {
    products,
    isLoading,
    error,
    fetchProducts,
    selectedCategory,
    setSelectedCategory,
  } = useProductStore();

  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // Fetch products on mount
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Get search term from URL
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  // Filter products by selected category and search term
  let filteredProducts =
    selectedCategory === "All" || selectedCategory === "all"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title?.toLowerCase().includes(searchTerm) ||
        product.name?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
    );
  }

  // Sort filtered products by price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const comparison = a.price - b.price;
    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Calculate pagination
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const handleCategoryChange = (category: string) => {
    console.log("Category changed to:", category); // Debug log
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8a812]"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={fetchProducts}
            className="bg-[#e8a812] hover:bg-[#d49610] text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <section className="w-full h-full my-10">
      <Categories
        activeCategory={selectedCategory}
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
              {sortOrder === "asc" ? "Low to High" : "High to Low"}
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
          {totalProducts > 0 ? (
            <>
              Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of{" "}
              {totalProducts} products
              {selectedCategory !== "All" &&
                selectedCategory !== "all" &&
                ` in ${selectedCategory.replace("-", " ").toLowerCase()}`}
            </>
          ) : (
            `No products found${
              selectedCategory !== "All" && selectedCategory !== "all"
                ? ` in ${selectedCategory.replace("-", " ").toLowerCase()}`
                : ""
            }`
          )}
        </div>
      </div>

      {/* Featured Products */}
      <div className="w-full grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">
              No products found in{" "}
              {selectedCategory === "All" || selectedCategory === "all"
                ? "this category"
                : selectedCategory.replace("-", " ")}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-colors ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === "..." ? (
                    <span className="px-3 py-2 text-gray-400">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page as number)}
                      className={`px-3 py-2 rounded-lg border transition-colors ${
                        currentPage === page
                          ? "bg-[#e8a812] text-white border-[#e8a812]"
                          : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
            >
              Last
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductList;
