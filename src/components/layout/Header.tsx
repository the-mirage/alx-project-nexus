"use client";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  BellIcon,
  HomeIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { NavItemsProps } from "@/interfaces";
import { useCart } from "@/stores/productStore";

const NavItems: React.FC<NavItemsProps> = ({ navOpen, setNavOpen }) => {
  const { itemCount } = useCart();

  return (
    <ul
      className={`bg-primary-color pr-10 ${
        navOpen
          ? "flex flex-col justify-around gap-4 shadow-md py-4 px-4 h-full"
          : "hidden md:flex gap-4 justify-around items-center"
      }`}
    >
      <li
        className={`flex gap-2 items-center shadow-md px-2 py-1 rounded-md ring-1 ring-gray-200 ${
          navOpen ? "w-full" : ""
        }`}
      >
        <MagnifyingGlassIcon className="h-5 w-5 ms-3 text-gray-500" />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search. . ."
          className={`text-md outline-0 ${navOpen ? "w-full" : ""}`}
        />
      </li>

      <li onClick={() => setNavOpen && setNavOpen(false)}>
        <Link href="/">
          <HomeIcon className="h-6 w-6" />
        </Link>
      </li>
      <li onClick={() => setNavOpen && setNavOpen(false)}>
        <Link href="/">
          <BellIcon className="h-6 w-6" />
        </Link>
      </li>
      <li onClick={() => setNavOpen && setNavOpen(false)}>
        <Link href="/cart" className="relative">
          <ShoppingCartIcon className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#e8a812] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {itemCount}
            </span>
          )}
        </Link>
      </li>
      <li>
        <Link href="/" className="cursor-pointer">
          Login
        </Link>
      </li>
    </ul>
  );
};

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <nav className="w-full bg-primary-color z-20">
      <div className="flex justify-between items-center p-5">
        <Link href="/" className="fashion-font text-2xl lg:ps-20 ps-10">
          ALX Trendz
        </Link>

        <div className="md:hidden flex items-center gap-2">
          <button className={`cursor-pointer ${navOpen ? "hidden" : ""}`}>
            Login
          </button>
          <button
            className="cursor-pointer"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? (
              <XMarkIcon className="w-6 h-6 right-4" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        <NavItems />
      </div>
      {navOpen && (
        <div className={`absolute bg-primary-color rounded-b-xl w-full z-20 `}>
          <NavItems navOpen={navOpen} setNavOpen={setNavOpen} />
        </div>
      )}
    </nav>
  );
};

export default Header;
