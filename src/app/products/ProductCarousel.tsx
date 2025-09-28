"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useProductStore } from "@/stores/productStore";

const ProductCarousel = () => {
  const { featuredProducts, fetchProducts, isLoading, error } =
    useProductStore();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch products on mount
  useEffect(() => {
    if (featuredProducts.length === 0) {
      fetchProducts();
    }
  }, [featuredProducts.length, fetchProducts]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || featuredProducts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredProducts.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  // Loading state
  if (isLoading || featuredProducts.length === 0) {
    return (
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden bg-gradient-to-br from-[#e8a812]/2 to-[#42121b]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8a812] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden bg-gradient-to-br from-[#e8a812]/2 to-[#42121b]/5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={fetchProducts}
            className="bg-[#e8a812] hover:bg-[#d49610] text-white px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentProduct = featuredProducts[currentSlide];
  const productName = currentProduct.title || currentProduct.name;
  const productImage = currentProduct.thumbnail || currentProduct.image;
  const discountedPrice = currentProduct.discountPercentage
    ? currentProduct.price -
      (currentProduct.price * currentProduct.discountPercentage) / 100
    : currentProduct.price;

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden bg-gradient-to-br from-[#e8a812]/2 to-[#42121b]/5 z-10">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={String(productImage)}
          alt={String(productName)}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#e8a812] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Featured Product
            </div>

            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {productName}
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 mb-6 leading-relaxed">
              {currentProduct.description}
            </p>

            {/* Product Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                {currentProduct.discountPercentage ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-bold text-white">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-300 line-through">
                      ${currentProduct.price.toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      {Math.round(currentProduct.discountPercentage)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    ${currentProduct.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm capitalize">
                  {currentProduct.category?.replace("-", " ")}
                </span>
                {currentProduct.rating && (
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    ★ {currentProduct.rating.toFixed(1)}
                  </span>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/products/${currentProduct.id}`}
                className="bg-[#e8a812] hover:bg-[#d49610] text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Shop Now
              </Link>
              <Link
                href="/products"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors z-30"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors z-30"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#e8a812] scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-30">
        <div
          className="h-full bg-[#e8a812] transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / featuredProducts.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProductCarousel;
