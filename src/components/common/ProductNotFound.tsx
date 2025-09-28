import { ParamValue } from "next/dist/server/request/params";
import React from "react";

const ProductNotFound = ({ productId }: { productId: ParamValue }) => {
  return (
    <section className="py-4 px-10 w-full h-full">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
          <p className="text-gray-600 mt-2">
            The product {productId} does not exist.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductNotFound;
