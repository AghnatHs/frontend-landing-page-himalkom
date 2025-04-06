import React from "react";
import TImages from "../../../utils/images";

const HeroSection = () => (
  <section>
    <div
      id="hero-section"
      className="flex flex-col justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 sm:mt-32 md:mt-20 w-full px-4 sm:flex-row"
    >
      {/* Logo Riset */}
      <img
        src={TImages.LOGO.LOGO_SYNTAX}
        alt="Logo Syntax"
        className="w-40 sm:w-40 md:w-48 lg:w-85"
      />
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left mt-4 sm:mt-0">
        {/* Title */}
        <h1 className="text-[64px] font-semibold">
          SYNTAX
        </h1>
        
        {/* Garis Dekoratif */}
        <img
          src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          alt="Garis Elevor"
          className="w-[200px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-4 sm:mb-3 md:mb-4 mx-auto sm:mx-0"
        />
        
        {/* Tagline dan Subtitle */}
        <div className="flex flex-col text-justify items-center sm:items-start max-w-lg sm:max-w-xl text-black text-lg sm:text-xl md:text-2xl font-normal">
         <p><b>Syntax</b> merupakan majalah tahunan yang dibuat oleh HImalkom IPB untuk memberikan informasi mengenai kaleidoskop program kerja yang telah terlaksana serta informasi lainnya dalam ruang lingkup departemen Ilmu Komputer IPB.</p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;