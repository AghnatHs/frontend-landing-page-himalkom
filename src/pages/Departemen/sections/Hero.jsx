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
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 lg:gap-24 items-center w-full px-4 sm:px-8 md:px-12 lg:px-24 py-8 md:py-12">
        {/* Gambar logo departemen */}
        {department?.logo ? (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/storage/${department.logo}`}
            alt={department.name || 'Logo Departemen'}
            className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[250px] h-auto"
          />
        ) : (
          <div className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[250px] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[250px] bg-gray-200 animate-pulse rounded"></div>
        )}

        {/* Judul dan deskripsi departemen */}
        <div className="flex flex-col text-center md:text-left w-full md:w-auto">
          <h1 className="font-semibold text-black pb-2 md:pb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            {department?.abbreviation || department?.name || 'Departemen'}
          </h1>
          
          {/* Gambar garis */}
          <div className="flex justify-center md:justify-start">
            {TImages?.DECORATIVE_ELEMENTS?.GARIS_HERO_ELEVOR ? (
              <img
                src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
                alt="Garis Hero"
                className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] mb-3 md:mb-4"
              />
            ) : (
              <div className="h-1.5 bg-purple-500 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] mb-3 md:mb-4"></div>
            )}
          </div>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium max-w-lg">
            {department?.description || department?.name || 'Deskripsi departemen'}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default HeroSection;