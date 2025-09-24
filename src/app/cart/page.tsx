"use client";
import React, { useState } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import trendz from "@/../public/images/trendz.png";
import { ProductListProps } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    discount: 10,
    category: "T-Shirts",
    image: trendz,
    quantity: 2,
  },
  {
    id: 2,
    name: "Cozy Winter Hoodie",
    price: 59.99,
    discount: 15,
    category: "Hoodies",
    image: trendz,
    quantity: 1,
  },
  {
    id: 3,
    name: "Designer Handbag",
    price: 149.99,
    discount: 20,
    category: "Bags",
    image: trendz,
    quantity: 1,
  },
];

const Cart: React.FC<ProductListProps> = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Calculate discounted price for a product
  const getDiscountedPrice = (price, discount) => {
    return discount ? price - (price * discount) / 100 : price;
  };

  // Update quantity of a specific item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = getDiscountedPrice(item.price, item.discount);
    return total + itemPrice * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  // Cart Item Component - Mobile Optimized
  const CartItem = ({ item }) => {
    const discountedPrice = getDiscountedPrice(item.price, item.discount);
    const itemTotal = discountedPrice * item.quantity;

    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border-b border-gray-200 last:border-b-0">
        {/* Mobile: Image and Details Row */}
        <div className="flex items-start gap-4 flex-1">
          {/* Product Image */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-800 line-clamp-2">
              {item.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">{item.category}</p>

            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
              {item.discount ? (
                <>
                  <span className="text-sm sm:text-base font-bold text-[#42121b]">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white bg-[#42121b] px-1 py-0.5 rounded">
                    {item.discount}% OFF
                  </span>
                </>
              ) : (
                <span className="text-sm sm:text-base font-bold text-[#42121b]">
                  ${item.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: Controls Row */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 sm:p-2 hover:bg-gray-100 transition-colors"
            >
              <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <span className="px-2 sm:px-4 py-1 sm:py-2 text-sm border-x min-w-[40px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 sm:p-2 hover:bg-gray-100 transition-colors"
            >
              <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Item Total */}
          <div className="text-right min-w-[60px] sm:min-w-[80px]">
            <p className="text-sm sm:text-base font-bold text-[#42121b]">
              ${itemTotal.toFixed(2)}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeItem(item.id)}
            className="p-1 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // Empty Cart State
  if (cartItems.length === 0) {
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
          <p className="text-gray-500 mb-6">
            Add some products to get started!
          </p>
          <Link href="/products">
            <button className="px-6 py-3 bg-[#e8a812] text-white rounded-lg hover:bg-[#d49610] transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Shopping Cart</h1>
        <p className="text-sm sm:text-base text-gray-600">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="flex-1 xl:flex-[2]">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-4">
            <Link
              href="/products"
              className="inline-block text-[#e8a812] hover:text-[#d49610] font-medium transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="xl:flex-[1] xl:max-w-sm">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 xl:sticky xl:top-4">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex justify-between items-center">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span
                  className={
                    shipping === 0
                      ? "text-green-600 font-medium"
                      : "text-gray-800"
                  }
                >
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              {shipping > 0 && subtotal < 50 && (
                <p className="text-xs sm:text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}

              <div className="flex justify-between items-center">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                <span>Total</span>
                <span className="text-[#42121b]">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-[#e8a812] text-white rounded-lg hover:bg-[#d49610] transition-colors font-semibold text-sm sm:text-base">
              Proceed to Checkout
            </button>

            {/* Promo Code */}
            <div className="mt-4">
              <details className="group">
                <summary className="text-[#e8a812] cursor-pointer font-medium text-sm sm:text-base">
                  Have a promo code?
                </summary>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8a812]"
                  />
                  <button className="px-3 sm:px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
                    Apply
                  </button>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
