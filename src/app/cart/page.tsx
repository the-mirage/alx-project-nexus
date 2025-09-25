"use client";
import React from "react";

import { useCart } from "@/stores/productStore";
import CartEmpty from "./CartEmpty";
import CartItems from "./CartItems";

const Cart: React.FC = () => {
  const { cartItems } = useCart();

  // Empty Cart State
  if (cartItems.length === 0) return <CartEmpty />;

  return <CartItems />;
};

export default Cart;
