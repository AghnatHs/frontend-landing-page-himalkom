import React from 'react';
import TImages from '@/utils/images';
import MotionReveal from '@/components/common/MotionReveal';

/**
 * Hero Section Component
 * 
 * Displays the main header section of the HIMALKOM landing page
 * featuring Elevor logo, tagline, and organizational identity
 * 
 * @returns {JSX.Element} The Hero section component
 */
const HeroSection = () => (
  <section>
    <div
      id="hero-section"
      className="flex flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 mt-10 sm:mt-15 md:mt-0 w-full px-4  "
    >
      {/* Logo Himalkom Elevor */}
      <MotionReveal animation="fade-left" delay={0.5}>
        <img
          src={TImages.LOGO.LOGO_ELEVOR}
          alt="Logo Himalkom"
          className="w-35 sm:w-45 md:w-60 xl:w-85"
        />
      </MotionReveal>
      <div className="flex flex-col items-start text-center mt-4 sm:mt-0">
        <MotionReveal animation="fade-right" delay={0.5}>
          {/* Teks Elevor */}
          <img 
            src={TImages.TEXT.TEKS_ELEVOR}
            alt="Elevor"
            className="w-sm sm:w-md md:w-lg lg:w-xl" 
          />
          {/* Garis Dekoratif */}
          <img
            src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
            alt="Garis Elevor"
            className="place-items-start w-[180px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-2 sm:mb-3 md:mb-4 mx-1"
          />
        </MotionReveal>
      
        <MotionReveal animation="fade-up" delay={0.5}>
          {/* Tagline dan Subtitle */}
          <div className="flex flex-col text-start text-black ">
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl">Elevate, Invest, Opportunity</span>
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl">Himpunan Mahasiswa Ilmu Komputer 2024/2025</span>
          </div>
        </MotionReveal>
      </div>
    </div>
  </section>
);

export default HeroSection;