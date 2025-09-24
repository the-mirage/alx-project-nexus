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
  const categories = ["All", "T-Shirts", "Hoodies", "Dresses", "Bags"];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mobile Dropdown Version
  const MobileCategories = () => (
    <div className="relative sm:hidden mb-4">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full flex items-center justify-between bg-[#e8a812]/8 px-4 py-3 rounded-md text-gray-700 font-medium"
      >
        <span>{activeCategory}</span>
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
          <div className="absolute top-full left-0 right-0 z-20 bg-white rounded-lg shadow-lg border border-gray-200 mt-1 py-2 max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-3 transition-colors ${
                  activeCategory === category
                    ? "bg-[#e8a812] text-white"
                    : "text-gray-700 hover:bg-[#e8a812]/10 hover:text-[#e8a812]"
                }`}
              >
                {category}
                {activeCategory === category && (
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
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-md transition-colors text-sm font-medium whitespace-nowrap ${
                activeCategory === category
                  ? "text-white bg-[#e8a812] shadow-sm"
                  : "text-gray-600 hover:text-black hover:bg-[#e8a812]/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Desktop Version (Original)
  const DesktopCategories = () => (
    <ul className="w-full hidden lg:flex justify-evenly gap-4 bg-[#e8a812]/8 rounded-md py-2 mb-4">
      {categories.map((category) => (
        <li
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`cursor-pointer px-4 py-2 rounded-md transition-colors font-medium ${
            activeCategory === category
              ? "text-white bg-[#e8a812] shadow-sm"
              : "text-gray-600 hover:text-black hover:bg-[#e8a812]/30"
          }`}
        >
          {category}
        </li>
      ))}
    </ul>
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
