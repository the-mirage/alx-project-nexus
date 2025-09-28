"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Categories = ({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) => {
  const categories = [
    "All",
    "Smartphones",
    "Laptops",
    "Fragrances",
    "Skincare",
    "Groceries",
    "Home Decoration",
    "Furniture",
    "Tops",
    "Women's Dresses",
    "Women's Shoes",
    "Men's Shirts",
    "Men's Shoes",
    "Men's Watches",
    "Women's Watches",
    "Women's Bags",
    "Women's Jewellery",
    "Sunglasses",
    "Automotive",
    "Motorcycle",
    "Lighting",
  ];

  // Category display names for better UX
  const getCategoryDisplayName = (category: string) => {
    const displayNames: { [key: string]: string } = {
      All: "All Products",
      Smartphones: "📱 Smartphones",
      Laptops: "💻 Laptops",
      Fragrances: "🌸 Fragrances",
      Skincare: "✨ Skincare",
      Groceries: "🛒 Groceries",
      "Home Decoration": "🏠 Home Decor",
      Furniture: "🪑 Furniture",
      Tops: "👕 Tops",
      "Women's Dresses": "👗 Women's Dresses",
      "Women's Shoes": "👠 Women's Shoes",
      "Men's Shirts": "👔 Men's Shirts",
      "Men's Shoes": "👞 Men's Shoes",
      "Men's Watches": "⌚ Men's Watches",
      "Women's Watches": "⌚ Women's Watches",
      "Women's Bags": "👜 Women's Bags",
      "Women's Jewellery": "💎 Women's Jewellery",
      Sunglasses: "🕶️ Sunglasses",
      Automotive: "🚗 Automotive",
      Motorcycle: "🏍️ Motorcycle",
      Lighting: "💡 Lighting",
    };
    return displayNames[category] || category;
  };

  // Get API-compatible category name
  const getApiCategoryName = (category: string) => {
    const apiNames: { [key: string]: string } = {
      All: "All",
      Smartphones: "smartphones",
      Laptops: "laptops",
      Fragrances: "fragrances",
      Skincare: "skincare",
      Groceries: "groceries",
      "Home Decoration": "home-decoration",
      Furniture: "furniture",
      Tops: "tops",
      "Women's Dresses": "womens-dresses",
      "Women's Shoes": "womens-shoes",
      "Men's Shirts": "mens-shirts",
      "Men's Shoes": "mens-shoes",
      "Men's Watches": "mens-watches",
      "Women's Watches": "womens-watches",
      "Women's Bags": "womens-bags",
      "Women's Jewellery": "womens-jewellery",
      Sunglasses: "sunglasses",
      Automotive: "automotive",
      Motorcycle: "motorcycle",
      Lighting: "lighting",
    };
    return apiNames[category] || category.toLowerCase();
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mobile Dropdown Version
  const MobileCategories = () => (
    <div className="relative sm:hidden mb-4">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full flex items-center justify-between bg-[#e8a812]/8 px-4 py-3 rounded-md text-gray-700 font-medium"
      >
        <span>{getCategoryDisplayName(activeCategory)}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10 bg-black/20"
            onClick={() => setIsDropdownOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 right-0 z-20 bg-white rounded-lg shadow-lg border border-gray-200 mt-1 py-2 max-h-80 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(getApiCategoryName(category));
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-3 transition-colors text-sm ${
                  activeCategory === getApiCategoryName(category)
                    ? "bg-[#e8a812] text-white"
                    : "text-gray-700 hover:bg-[#e8a812]/10 hover:text-[#e8a812]"
                }`}
              >
                {getCategoryDisplayName(category)}
                {activeCategory === getApiCategoryName(category) && (
                  <span className="float-right">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );

  // Tablet Horizontal Scroll Version
  const TabletCategories = () => (
    <div className="hidden sm:block lg:hidden mb-4">
      <div className="bg-[#e8a812]/8 rounded-md p-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.slice(0, 10).map(
            (
              category // Show first 10 categories on tablet
            ) => (
              <button
                key={category}
                onClick={() => onCategoryChange(getApiCategoryName(category))}
                className={`flex-shrink-0 px-3 py-2 rounded-md transition-colors text-xs font-medium whitespace-nowrap ${
                  activeCategory === getApiCategoryName(category)
                    ? "text-white bg-[#e8a812] shadow-sm"
                    : "text-gray-600 hover:text-black hover:bg-[#e8a812]/30"
                }`}
              >
                {getCategoryDisplayName(category)}
              </button>
            )
          )}

          {/* More dropdown for remaining categories */}
          {categories.length > 10 && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex-shrink-0 px-3 py-2 rounded-md transition-colors text-xs font-medium whitespace-nowrap text-gray-600 hover:text-black hover:bg-[#e8a812]/30"
              >
                More...
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute top-full right-0 z-20 bg-white rounded-lg shadow-lg border border-gray-200 mt-1 py-2 min-w-48 max-h-60 overflow-y-auto">
                    {categories.slice(10).map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          onCategoryChange(getApiCategoryName(category));
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 transition-colors text-sm ${
                          activeCategory === getApiCategoryName(category)
                            ? "bg-[#e8a812] text-white"
                            : "text-gray-700 hover:bg-[#e8a812]/10 hover:text-[#e8a812]"
                        }`}
                      >
                        {getCategoryDisplayName(category)}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Desktop Version - Grid Layout for Better Organization
  const DesktopCategories = () => (
    <div className="hidden lg:block mb-4">
      <div className="bg-[#e8a812]/8 rounded-md p-4">
        {/* Popular Categories */}
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Popular Categories
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              "All",
              "Tops",
              "Men's Shirts",
              "Women's Dresses",
              "Fragrances",
              "Women's Bags",
              "Men's Watches",
            ].map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(getApiCategoryName(category))}
                className={`px-3 py-1.5 rounded-md transition-colors text-sm font-medium ${
                  activeCategory === getApiCategoryName(category)
                    ? "text-white bg-[#e8a812] shadow-sm"
                    : "text-gray-600 hover:text-black hover:bg-[#e8a812]/30"
                }`}
              >
                {getCategoryDisplayName(category)}
              </button>
            ))}
          </div>
        </div>

        {/* All Categories */}
        <div>
          <details className="group">
            <summary className="text-sm font-semibold text-gray-700 cursor-pointer hover:text-[#e8a812] transition-colors">
              All Categories ({categories.length - 1})
            </summary>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {categories.slice(1).map(
                (
                  category // Exclude "All" since it's already in popular
                ) => (
                  <button
                    key={category}
                    onClick={() =>
                      onCategoryChange(getApiCategoryName(category))
                    }
                    className={`px-3 py-2 rounded-md transition-colors text-sm font-medium text-left ${
                      activeCategory === getApiCategoryName(category)
                        ? "text-white bg-[#e8a812] shadow-sm"
                        : "text-gray-600 hover:text-black hover:bg-[#e8a812]/30"
                    }`}
                  >
                    {getCategoryDisplayName(category)}
                  </button>
                )
              )}
            </div>
          </details>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <MobileCategories />
      <TabletCategories />
      <DesktopCategories />
    </>
  );
};

export default Categories;
