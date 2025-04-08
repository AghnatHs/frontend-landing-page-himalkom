import React from 'react';
import TImages from '@/utils/images';
import ScrollReveal from '@/components/common/ScrollReveal';

/**
 * Hero section for department page
 * Displays department logo, name, and description
 * 
 * @param {Object} props
 * @param {Object} props.department - Department data
 * @returns {JSX.Element}
 */
const HeroSection = ({ department }) => {  
  if (!department) {
    return <div className="text-center py-8">Data departemen tidak tersedia</div>;
  }

  const scrollRevealOptions = {
    threshold: 0.2,         
    rootMargin: "-100px 0px",  
    triggerOnce: false       
};

  return (
    <ScrollReveal animation="fade-up" options={scrollRevealOptions} delay={300}>
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 lg:gap-24 items-center w-full px-4 sm:px-8 md:px-12 lg:px-24 py-8 md:py-12">
        {/* Department logo */}
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

        {/* Department name and description */}
        <div className="flex flex-col text-center md:text-left w-full md:w-auto">
          <h1 className="font-semibold text-black pb-2 md:pb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
        {/* Judul dan deskripsi departemen */}
        <div className="flex flex-col items-start text-center sm:text-left mt-4 sm:mt-0">
          <h1 className="max-w-xl text-start font-semibold md:pb-3 text-2xl sm:text-2xl md:text-4xl lg:text-[45px] leading-normal">
            {department?.abbreviation || department?.name || 'Departemen'}
          </h1>
          
          {/* Decorative line */}
          <div className="flex justify-center md:justify-start">
            <img 
              src={TImages.DECORATIVE_ELEMENTS.GARIS_PRESTASI}
              alt="Divider"
              className="w-[200px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-4 md:my-6"
            />
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
          
          {/* Department description */}
          <p className="text-lg sm:text-xl md:text-2xl mx-auto md:mx-0 max-w-2xl">
            {department?.description || 'Deskripsi tidak tersedia'}
          <p className="text-left items-center max-w-sm sm:items-start sm:max-w-xl text-black text-[14px] sm:text-xl md:text-xl lg:text-2xl font-normal">
            {department?.description || department?.name || 'Deskripsi departemen'}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default HeroSection;