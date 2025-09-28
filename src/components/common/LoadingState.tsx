import React from "react";

const LoadingState = () => {
  return (
    <section className="py-4 px-10 w-full h-full">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    </section>
  );
};

export default LoadingState;
