import React, { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ScrollReveal from '@/components/common/ScrollReveal';
import { useCarousel } from '@/hooks/useCarousel';

/**
 * Arranges staff members for grid layout
 * Places department head (ketua) in the center
 * 
 * @param {Object} ketua - Department head data
 * @param {Array} regularStaff - Regular staff members data
 * @returns {Array} Arranged staff for grid display
 */
const arrangeStaffForGrid = (ketua, regularStaff) => {
  // No staff or only regular staff
  if (!regularStaff?.length) return ketua ? [ketua] : [];
  if (!ketua) return regularStaff;

  // If we have both ketua and regular staff
  if (regularStaff.length <= 2) {
    return [regularStaff[0], ketua, regularStaff[1] || null].filter(Boolean);
  } else if (regularStaff.length <= 5) {
    const middle = Math.floor(regularStaff.length / 2);
    return [
      ...regularStaff.slice(0, middle),
      ketua,
      ...regularStaff.slice(middle)
    ];
  } else {
    // For larger departments, place ketua in the middle of first row
    return [
      regularStaff[0],
      ketua,
      regularStaff[1],
      ...regularStaff.slice(2)
    ];
  }
};

/**
 * Staff Card Component
 * Displays individual staff member information
 */
const StaffCard = ({ staff, baseUrl }) => {
  return (
    <div className="shadow-card bg-white rounded-2xl mx-8 py-4 flex flex-col items-center text-center w-[180px] sm:w-[150px] md:w-[240px]">
      <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden border-4 border-primary">
        <img
          src={staff.image ? `${baseUrl}/storage/${staff.image}` : '/images/avatar-placeholder.png'}
          alt={staff.name || 'Staff Member'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/avatar-placeholder.png';
          }}
        />
      </div>
      <h3 className="mt-4 font-semibold text-lg md:text-2xl">{staff.jabatan || 'Staff'}</h3>
      <p className="text-primary-darker text-sm md:text-base">{staff.name || 'Unnamed'}</p>
    </div>
  );
};

/**
 * Staff Section Component
 * Displays department staff with desktop grid and mobile carousel
 * 
 * @param {Object} props
 * @param {Array} props.staff - Staff members data
 * @param {string} props.baseUrl - API base URL
 * @returns {JSX.Element}
 */
const StaffSection = ({ staff, baseUrl }) => {
  const sliderRef = useRef(null);
  
  if (!staff || staff.length === 0) {
    return <p className="text-center text-gray-500 text-xl">No staff data available.</p>;
  }

  // Separate department head from regular staff
  const ketua = staff.find(member => member.isKetua === 1);
  const regularStaff = staff.filter(member => member.isKetua !== 1);
  
  // Prepare data for grid and carousel
  const carouselStaff = ketua ? [ketua, ...regularStaff] : regularStaff;
  const gridStaff = arrangeStaffForGrid(ketua, regularStaff);
  
  // Initialize carousel using custom hook
  const { currentIndex, goToSlide, setPause, goToPrev, goToNext } = useCarousel(carouselStaff);
  
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

        {/* Desktop Grid - hidden on mobile */}
        <div className="hidden md:grid grid-cols-3 gap-x-12 gap-y-16 md:gap-y-24">
          {gridStaff.map((staffMember, index) => (
            <div 
              key={staffMember.id || `staff-grid-${index}`}
              className={`flex justify-center ${getCardPositionClass(index)}`}
            >
              <StaffCard staff={staffMember} baseUrl={baseUrl} />
            </div>
          ))}
        </div>

        {/* Mobile Carousel - only visible on mobile */}
        <div 
          className="md:hidden relative w-full mx-auto" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={sliderRef}
            className="flex overflow-hidden p-4"
          >
            <div 
              className="flex transition-transform duration-300 ease-out w-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselStaff.map((staffMember, index) => (
                <div 
                  key={staffMember.id || `staff-carousel-${index}`}
                  className="w-full min-w-full flex justify-center"
                >
                  <StaffCard staff={staffMember} baseUrl={baseUrl} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          {carouselStaff.length > 1 && (
            <>
              <div className="absolute top-1/2 left-10 -translate-y-1/2">
                <button
                  onClick={goToPrev}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md focus:outline-none border border-gray-200"
                  aria-label="Previous staff member"
                >
                  <FiChevronLeft size={24} className="text-primary-dark" />
                </button>
              </div>
              
              <div className="absolute top-1/2 right-10 -translate-y-1/2">
                <button
                  onClick={goToNext}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md focus:outline-none border border-gray-200"
                  aria-label="Next staff member"
                >
                  <FiChevronRight size={24} className="text-primary-dark" />
                </button>
              </div>
            </>
          )}

          {/* Pagination dots */}
          <div className="flex justify-center mt-6 gap-2">
            {carouselStaff.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === currentIndex ? 'bg-primary-dark' : 'bg-primary-light'
                }`}
                aria-label={`Go to staff ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default StaffSection;