import React from "react";
import ProductList from "../../components/products/ProductList";
import QuickStats from "./QuickStats";
import ProductCarousel from "./ProductCarousel";

const ProductsPage = () => {
  return (
    <div>
      <ProductCarousel />
      <QuickStats />
      <div className="w-full h-full sm:px-20 px-8">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;
