"use client";
import Image from "next/image";
import React from "react";
import fashion from "@/../public/images/jewel.svg";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const handleExploreMore = () => {
    router.push("/products");
  };
  return (
    <section className="w-full h-full">
      <div className="flex md:flex-nowrap flex-wrap justify-center items-center gap-5">
        <div className="space-y-5 md:w-1/2">
          <h1 className="lg:text-6xl md:text-5xl sm:text-3xl text-2xl font-bold md:w-3/4 tracking-wide">
            Discover and Flex
            <span className="text-[#e8a812] fashion-font lg:text-7xl font-black">
              {" "}
              Your{" "}
            </span>
            Style
          </h1>
          <p className="text-accent-color-secondary font-medium md:text-xl sm:text-lg text-base">
            Find your own fashion, where we blend creativity with craftsmanship
            to create fashion that transcends trends.
          </p>
          <div className="2xl:w-1/2 lg:w-3/4 flex sm:flex-nowrap flex-wrap justify-start gap-5">
            <button className="w-full md:text-xl sm:text-base bg-secondary-color sm:py-3 py-2 sm:px-4 px-3 rounded-md shadow-md cursor-pointer">
              Order Now
            </button>
            <button
              onClick={handleExploreMore}
              className="w-full md:text-xl sm:text-base bg-primary-color sm:py-3 py-2 sm:px-4 px-3 rounded-md border-1 shadow-md cursor-pointer hover:bg-opacity-70 transition-colors"
            >
              Explore More
            </button>
          </div>
        </div>
        {/* Hero Image */}
        <div className="md:w-2/5 sm:w-3/5 flex items-center justify-center">
          <Image src={fashion} alt="Fashion style" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
