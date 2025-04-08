import React from 'react';
import TImages from '@/utils/images';
import ScrollReveal from '@/components/common/ScrollReveal';

/**
 * Hero Section untuk halaman departemen
 */
const HeroSection = ({ department }) => {  
  if (!department) {
    return <div className="text-center py-8">Data departemen tidak tersedia</div>;
  }

  return (
    <ScrollReveal animation="fade-up" options={{ threshold: 0.3 }}>
      <div className="flex flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 mt-15 w-full px-4">
        {/* Gambar logo departemen */}
        {department?.logo ? (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/storage/${department.logo}`}
            alt={department.name || 'Logo Departemen'}
            className="w-28 sm:w-40 md:w-60 xl:w-85"
          />
        ) : (
          <div className="w-28 sm:w-40 md:w-60 xl:w-90 bg-gray-200 animate-pulse rounded"></div>
        )}

        {/* Judul dan deskripsi departemen */}
        <div className="flex flex-col items-start text-center sm:text-left mt-4 sm:mt-0">
          <h1 className="max-w-xl text-start font-semibold md:pb-3 text-2xl sm:text-2xl md:text-4xl lg:text-[45px] leading-normal">
            {department?.abbreviation || department?.name || 'Departemen'}
          </h1>
          
          {/* Gambar garis */}
          <div className="flex justify-center md:justify-start">
            {TImages?.DECORATIVE_ELEMENTS?.GARIS_HERO_ELEVOR ? (
              <img
                src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
                alt="Garis Hero"
                className="place-items-start w-[150px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-2 sm:mb-3 md:mb-4 mx-1"
              />
            ) : (
              <div className="h-1.5 bg-purple-500 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] mb-3 md:mb-4"></div>
            )}
          </div>
          
          <p className="text-left items-center max-w-sm sm:items-start sm:max-w-xl text-black text-[14px] sm:text-xl md:text-xl lg:text-2xl font-normal">
            {department?.description || department?.name || 'Deskripsi departemen'}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default HeroSection;