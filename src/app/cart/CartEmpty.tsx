import Link from "next/link";
import React from "react";

const CartEmpty = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="text-center py-16">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-gray-400 text-xl sm:text-2xl">🛒</span>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">Add some products to get started!</p>
        <Link href="/products">
          <button className="px-6 py-3 bg-[#e8a812] text-white rounded-lg hover:bg-[#d49610] transition-colors">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
