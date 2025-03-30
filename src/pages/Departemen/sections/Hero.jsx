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

  return (
    <ScrollReveal animation="fade-up" options={{ threshold: 0.3 }}>
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 lg:gap-24 items-center w-full px-4 sm:px-8 md:px-12 lg:px-24 py-8 md:py-12">
        {/* Department logo */}
        {department?.logo ? (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/storage/${department.logo}`}
            alt={department.name || 'Logo Departemen'}
            className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[250px] h-auto"
          />
        ) : (
          <div className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[250px] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[250px] bg-gray-200 animate-pulse rounded"></div>
        )}

        {/* Department name and description */}
        <div className="flex flex-col text-center md:text-left w-full md:w-auto">
          <h1 className="font-semibold text-black pb-2 md:pb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            {department?.abbreviation || department?.name || 'Departemen'}
          </h1>
          
          {/* Decorative line */}
          <div className="flex justify-center md:justify-start">
            <img 
              src={TImages.DECORATIVE_ELEMENTS.GARIS_PRESTASI}
              alt="Divider"
              className="w-[200px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-4 md:my-6"
            />
          </div>
          
          {/* Department description */}
          <p className="text-lg sm:text-xl md:text-2xl mx-auto md:mx-0 max-w-2xl">
            {department?.description || 'Deskripsi tidak tersedia'}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default HeroSection;