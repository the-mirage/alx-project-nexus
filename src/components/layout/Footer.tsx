import Link from "next/link";
import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="pt-10 pb-4 bg-secondary-color text-[14px]">
      <div className="flex flex-wrap justify-around gap-4">
        <Link href="/" className="text-2xl lg:ps-20 ps-10">
          ALX Trendz
        </Link>
        {/* Quick links */}
        <div>
          <h1 className="font-semibold text-[15px] opacity-95">Quick Link</h1>
          <ul className="opacity-90">
            <li>Home</li>
            <li>Contact</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* Important Links */}
        <div>
          <h1 className="font-semibold text-[15px] opacity-95">
            Product Hacks
          </h1>
          <ul className="opacity-90">
            <li>All Products</li>
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Sale</li>
          </ul>
        </div>

        {/* Additional Links */}
        <div>
          <h1 className="font-semibold text-[15px] opacity-95">Updates</h1>
          <ul className="opacity-90">
            <li>About</li>
            <li>Blog</li>
            <li>Affiliate Program</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-sm mt-2">
        <p>&copy; {date}. All rights reserved </p>
      </div>
    </footer>
  );
};

export default Footer;
