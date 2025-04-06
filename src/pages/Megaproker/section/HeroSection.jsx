import React from "react";
import TImages from "@/utils/images";

const HeroSection = () => (
  <section>
    <div
      id="hero-section"
      className="flex flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 md:mt-5 w-full px-4"
    >
      {/* Logo Riset */}
      <img
        src={TImages.LOGO.LOGO_MEGAPROKER}
        alt="Logo Himalkom"
        className="w-40 sm:w-40 md:w-60 xl:w-85"
      />
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left mt-4 sm:mt-0">
        {/* Title */}
        <h1 className="max-w-2xl text-start font-semibold pb-2 md:pb-4 text-[18px] sm:text-2xl md:text-4xl lg:text-[52px] leading-tight">
          MEGAPROKER HIMALKOM<br/> IPB UNIVERSITY 2024/2025
        </h1>
        
        {/* Garis Dekoratif */}
        <img
          src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          alt="Garis Elevor"
          className="w-[200px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-4 sm:mb-3 md:mb-4 mx-auto sm:mx-0"
        />
      </div>
    </div>
  </section>
);

export default HeroSection;