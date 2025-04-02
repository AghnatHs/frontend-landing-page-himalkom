import React from "react";
import TImages from "../../../utils/images";

const HeroSection = () => (
  <section>
    <div
      id="hero-section"
      className="flex flex-col justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 sm:mt-32 md:mt-20 w-full px-4 sm:flex-row"
    >
      {/* Logo Himalkom Elevor */}
      <img
        src={TImages.LOGO.LOGO_ELEVOR}
        alt="Logo Himalkom"
        className="w-40 sm:w-40 md:w-48 lg:w-80"
      />
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left mt-4 sm:mt-0">
        {/* Teks Elevor */}
        <img 
          src={TImages.TEXT.TEKS_ELEVOR}
          alt="Elevor"
          className="w-40 sm:w-40 md:w-48 lg:w-xl" 
        />
        
        {/* Garis Dekoratif */}
        <img
          src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          alt="Garis Elevor"
          className="w-[200px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-4 sm:mb-3 md:mb-4 mx-auto sm:mx-0"
        />
        
        {/* Tagline dan Subtitle */}
        <div className="flex flex-col items-center sm:items-start text-black text-lg sm:text-xl md:text-2xl font-normal">
          <span>Elevate, Invest, Opportunity</span>
          <span className="text-sm sm:text-base md:text-xl lg:text-2xl">Himpunan Mahasiswa Ilmu Komputer 2024/2025</span>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;