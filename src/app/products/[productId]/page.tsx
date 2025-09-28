"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import ProductCard from "@/components/products/ProductCard";
import { useProductStore } from "@/stores/productStore";
import ProductNotFound from "@/components/common/ProductNotFound";
import { ProductProps } from "@/interfaces";
import LoadingState from "@/components/common/LoadingState";

const ProductDetails = () => {
  const params = useParams();
  const { productId } = params;

  const { products, fetchProducts, getProductById, addToCart, isLoading } =
    useProductStore();

  const [currentProduct, setCurrentProduct] = useState<ProductProps | null>(
    null
  );
  const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    // Fetch products if not already loaded
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  useEffect(() => {
    if (products.length > 0 && productId) {
      // Try to find product by ID first
      let product: ProductProps | undefined;
      if (!isNaN(Number(productId))) {
        product = getProductById(Number(productId));
      }
      if (!product) {
        product = products.find((item: ProductProps) => {
          const productSlug = (item.title || item.name || "")
            .replace(/\s+/g, "-")
            .toLowerCase();
          return productSlug === productId;
        });
      }

      setCurrentProduct(product ?? null);

      // Get related products (same category, excluding current product)
      if (product) {
        const related = products
          .filter(
            (item: ProductProps) =>
              item.category === product?.category && item.id !== product.id
          )
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [products, productId, getProductById]);

  const handleAddToCart = () => {
    if (currentProduct) {
      addToCart(currentProduct, 1);
      console.log(
        `Added ${currentProduct.title || currentProduct.name} to cart`
      );
    }
  };

  // Handle case where product is not found
  if (!currentProduct && !isLoading) {
    return <ProductNotFound productId={productId} />;
  }

  if (isLoading || !currentProduct) {
    return <LoadingState />;
  }

  const discountedPrice = currentProduct.discountPercentage
    ? currentProduct.price -
      (currentProduct.price * currentProduct.discountPercentage) / 100
    : currentProduct.price;

  const productName = currentProduct.title || currentProduct.name || "";
  const productImage =
    currentProduct.thumbnail ||
    currentProduct.image ||
    "https://dummyjson.com/image/350x200/?text=broken+image";
  const productDiscount =
    currentProduct.discountPercentage || currentProduct.discount;

  return (
    <section className="py-8 px-10 w-full h-full">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 shadow-xl bg-[#e8a812]/2 rounded-md p-6 sm:w-4/5 mx-auto">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <Image
            src={productImage}
            alt={productName}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product Information */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{productName}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Brand:{" "}
              {currentProduct.brand ||
                currentProduct.description?.slice(0, 20) + "..."}
            </p>
            <hr className="w-full border-1 border-[#e8a812]" />
          </div>

          {/* Price Section */}
          <div className="space-y-2">
            {productDiscount ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#42121b]">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${currentProduct.price.toFixed(2)}
                </span>
                <span className="text-sm text-white bg-[#42121b] px-2 py-1 rounded-md">
                  {Math.round(productDiscount)}% OFF
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-[#42121b]">
                ${currentProduct.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {currentProduct.description}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-[#e8a812] hover:bg-[#d49610] text-white font-semibold px-6 py-3 rounded-lg transition-colors sm:mt-10 mt-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Additional product details could go here */}
      <div className="py-10 sm:px-10 px-4 rounded-lg">
        <h4 className="font-semibold mb-2">Product Features</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• High quality materials</li>
          <li>• Free shipping on orders over $50</li>
          <li>• 30-day return policy</li>
        </ul>
      </div>

      {/* List other products */}
      <div className="">
        <h1 className="font-semibold text-2xl">Browse other products</h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-8 gap-4 mt-5">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
