import React from "react";
import Hero from "./Hero";
import ProductList from "@/components/products/ProductList";

const HomePage = () => {
  return (
    <section className="pb-16 pt-5 md:px-20 px-16">
      <Hero />
      <ProductList />
    </section>
  );
};

export default HomePage;
