import React from 'react';
import TImages from '../../../utils/images';

/**
 * Section hero untuk halaman utama
 */
const HeroSection = () => (
  <section className="">
    <div
      id="hero-section"
      className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 mt-32 sm:mt-48 md:mt-64 w-full px-4"
    >
      <img
        src={TImages.LOGO.LOGO_HIMALKOM}
        alt="Logo Himalkom"
        className="w-32 sm:w-40 md:w-48 lg:w-52"
      />
      <div className="flex flex-col text-center sm:text-left mt-4 sm:mt-0">
        <h1 className="font-semibold text-black text-[60px] sm:text-[80px] md:text-[90px] lg:text-[110px] leading-none w-full sm:w-[280px] md:w-[320px] lg:w-[363px]">
          Elevor
        </h1>
        <img
          src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          alt="Garis Elevor"
          className="w-[200px] sm:w-[260px] md:w-[300px] lg:w-[361px] mb-2 sm:mb-3 md:mb-4 mx-auto sm:mx-0"
        />
        <div className="flex flex-col text-black text-lg sm:text-xl md:text-2xl font-normal">
          <span>Elevate, Invest, Opportunity</span>
          <span className="text-sm sm:text-base md:text-xl lg:text-2xl">Himpunan Mahasiswa Ilmu Komputer 2024/2025</span>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;