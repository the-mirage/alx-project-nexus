"use client";
import React, { useState, useEffect } from "react";
import ProductList from "../../components/products/ProductList";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import trendz from "@/../public/images/trendz.png";

// Featured products for the hero carousel
const featuredProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    discount: 10,
    category: "T-Shirts",
    image: trendz,
    description:
      "Comfortable and stylish cotton t-shirt perfect for everyday wear.",
    featured: true,
    heroTitle: "Comfort Meets Style",
    heroSubtitle: "Discover our premium cotton collection",
  },
  {
    id: 2,
    name: "Cozy Winter Hoodie",
    price: 59.99,
    discount: 15,
    category: "Hoodies",
    image: trendz,
    description: "Warm and comfortable hoodie for cold weather.",
    featured: true,
    heroTitle: "Stay Warm in Style",
    heroSubtitle: "Perfect for the cold season",
  },
  {
    id: 3,
    name: "Designer Handbag",
    price: 149.99,
    discount: 20,
    category: "Bags",
    image: trendz,
    description: "Stylish handbag for modern women.",
    featured: true,
    heroTitle: "Elegance Redefined",
    heroSubtitle: "Luxury accessories for every occasion",
  },
];

const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentProduct = featuredProducts[currentSlide];
  const discountedPrice = currentProduct.discount
    ? currentProduct.price -
      (currentProduct.price * currentProduct.discount) / 100
    : currentProduct.price;

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden bg-gradient-to-br from-[#e8a812]/2 to-[#42121b]/5 ">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={currentProduct.image}
          alt={currentProduct.name}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#e8a812] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Featured Product
            </div>

            {/* Hero Text */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {currentProduct.heroTitle}
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 mb-6 leading-relaxed">
              {currentProduct.heroSubtitle}
            </p>

            {/* Product Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                {currentProduct.discount ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-bold text-white">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-300 line-through">
                      ${currentProduct.price.toFixed(2)}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      {currentProduct.discount}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold text-white">
                    ${currentProduct.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">in</span>
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {currentProduct.category}
                </span>
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
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
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
