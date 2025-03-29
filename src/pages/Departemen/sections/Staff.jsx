import React, { useState, useRef, useEffect } from 'react';
import { useCarousel } from '@/hooks/useCarousel';
import SectionHeader from '@/components/common/SectionHeader';
import ScrollReveal from '@/components/common/ScrollReveal';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const StaffCard = ({ staff, baseUrl, className, delay = 400, isCarousel = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const imageUrl = staff.image
    ? `${baseUrl}/storage/${staff.image}`
    : 'https://placehold.co/200/primary-dark/white?text=No+Photo';

  // Ukuran gambar lebih besar untuk carousel
  const imageSize = isCarousel 
    ? "w-36 h-36 md:w-40 md:h-40" 
    : "w-24 h-24 md:w-28 md:h-28 lg:w-38 lg:h-40";

  return (
    <div 
      ref={cardRef}
      className={`flex flex-col items-center text-center bg-white shadow-card rounded-lg mt-6 p-6 border min-w-64 border-primary-light transform transition-all duration-700 
        ${isVisible ? `opacity-100 ${className || ''}` : 'opacity-0 translate-y-10'}`}
    >
      <div className={`${imageSize} rounded-full overflow-hidden border-2 border-primary-dark`}>
        <img
          src={imageUrl}
          alt={staff.name || 'Staff member'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/200/primary-dark/white?text=No+Photo';
            e.target.onerror = null;
          }}
        />
      </div>
      <h3 className="mt-4 font-semibold text-lg md:text-2xl">{staff.jabatan || 'Staff'}</h3>
      <p className="text-primary-darker text-sm md:text-base">{staff.name || 'Unnamed'}</p>
    </div>
  );
};

const StaffSection = ({ staff, baseUrl }) => {
  const sliderRef = useRef(null);
  
  if (!staff || staff.length === 0) {
    
    return <p className="text-center text-gray-500 text-xl">No staff data available.</p>;
  }

  const ketua = staff.find(member => member.isKetua === 1);
  const regularStaff = staff.filter(member => member.isKetua !== 1);
  
  // Persiapan data untuk grid dan carousel
  const carouselStaff = ketua ? [ketua, ...regularStaff] : regularStaff;
  const gridStaff = arrangeStaffForGrid(ketua, regularStaff);
  
  const { currentIndex, goToSlide, setPause, goToPrev, goToNext } = useCarousel(carouselStaff, false);
  
  // Event handlers
  const handleMouseEnter = () => setPause(true);
  const handleMouseLeave = () => setPause(false);
  
  // Layout styling
  const getCardPositionClass = (index) => {
    const column = index % 3;
    if (column === 1) {
      if (index === 1) return '-translate-y-20';
      else if (index === 4 || index === 7) return 'translate-y-20';
    }
    return '';
  };

  const scrollRevealOptions = {
    threshold: 0.2,         
    rootMargin: "-100px 0px",  
    triggerOnce: false       
};


  return (
    <ScrollReveal animation="fade-up" options={scrollRevealOptions} delay={300}>
      <div className="flex flex-col items-center max-w-6xl mx-auto py-12">
        <SectionHeader title="STAFF" altText="Garis Staff" />
        
        {/* Grid Layout untuk Desktop - PURE CSS RESPONSIVE! */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-x-24 gap-y-32 justify-items-center w-full">
          {gridStaff.map((member, index) => (
            member.id === 'placeholder-0' ? (
              <div key="placeholder" className="invisible" />
            ) : (
              <StaffCard 
                key={member.id || index} 
                staff={member} 
                baseUrl={baseUrl}
                className={getCardPositionClass(index)}
                delay={index * 200}
              />
            )
          ))}
        </div>
        
        {/* Carousel untuk Mobile*/}
        <div 
          className="block md:hidden relative w-full max-w-xs mx-auto mb-8" 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={sliderRef}
            className="flex overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-300 ease-out w-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselStaff.map((member, index) => (
                <div 
                  key={member.id || index} 
                  className="w-full min-w-full flex-shrink-0 p-2"
                >
                  <StaffCard 
                    staff={member} 
                    baseUrl={baseUrl}
                    delay={0}
                    isCarousel={true}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Tombol Navigasi */}
          <div className="absolute top-1/2 -left-6 -translate-y-1/2">
            <button 
              onClick={goToPrev}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md focus:outline-none border border-gray-200"
              aria-label="Previous staff member"
            >
              <FiChevronLeft size={24} className="text-primary-dark" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-6 -translate-y-1/2">
            <button 
              onClick={goToNext}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md focus:outline-none border border-gray-200"
              aria-label="Next staff member"
            >
              <FiChevronRight size={24} className="text-primary-dark" />
            </button>
          </div>
          
          {/* Indikator Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {carouselStaff.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === currentIndex ? 'bg-primary-dark' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

function arrangeStaffForGrid(ketua, regularStaff) {
  const grid = [];
  
  if (regularStaff.length > 0) {
    grid.push(regularStaff[0]);
  } else {
    grid.push({ id: 'placeholder-0', name: '', jabatan: '', image: '' });
  }
  
  if (ketua) {
    grid.push(ketua);
  }
  
  if (regularStaff.length > 1) {
    grid.push(...regularStaff.slice(1));
  }
  
  return grid;
}

export default StaffSection;