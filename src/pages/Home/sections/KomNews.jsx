import React, { useState, useRef } from 'react';
import ReadMoreButton from '@/components/common/ReadMore';
import DOMPurify from 'dompurify';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * Section berita (KOMnews) - fully responsive dengan swipe gesture pada mobile
 */
const Komnews = ({ newsData, loadingNews, errorNews, currentNewsIndex, goToNewsSlide, baseUrl }) => {
  if (loadingNews) return <p className="text-center">Loading news...</p>;
  if (errorNews) return <p className="text-red-500 font-bold text-xl text-center">Error: {errorNews}</p>;
  if (!newsData || !newsData.komnews) return null;
  
  // Touch handling untuk swipe gesture
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Handle touch start event
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  // Handle touch end event
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };
  
  // Calculate swipe direction and navigate
  const handleSwipe = () => {
    // Minimal swipe distance (in pixels)
    const minSwipeDistance = 50;
    
    const swipeDistance = touchEndX.current - touchStartX.current;
    
    if (swipeDistance > minSwipeDistance) {
      // Swipe right to left (previous)
      goToPrevSlide();
    } else if (swipeDistance < -minSwipeDistance) {
      // Swipe left to right (next)
      goToNextSlide();
    }
  };
  
  // Fungsi untuk sanitasi HTML
  const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html, {
      // Opsi konfigurasi - membolehkan tag tertentu yang aman
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a'],
      // Opsi untuk atribut yang diperbolehkan
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
  };

  // Fungsi navigasi
  const goToPrevSlide = () => {
    const prevIndex = (currentNewsIndex - 1 + newsData.komnews.length) % newsData.komnews.length;
    goToNewsSlide(prevIndex);
  };

  const goToNextSlide = () => {
    const nextIndex = (currentNewsIndex + 1) % newsData.komnews.length;
    goToNewsSlide(nextIndex);
  };

  return (
    <div className="relative w-full max-w-4xl px-4 sm:px-6 md:px-8 mx-auto">
      {/* Tombol navigasi arrow - hidden pada mobile, tampil dari sm ke atas */}
      <button 
        onClick={goToPrevSlide}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-10 bg-primary w-8 h-8 md:w-10 md:h-10 rounded-full shadow-md hover:bg-primary-dark transition-colors items-center justify-center"
        aria-label="Previous news"
      >
        <FaChevronLeft className="text-primary-darker" />
      </button>
      
      <button 
        onClick={goToNextSlide}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-10 bg-primary w-8 h-8 md:w-10 md:h-10 rounded-full shadow-md hover:bg-primary-dark transition-colors items-center justify-center"
        aria-label="Next news"
      >
        <FaChevronRight className="text-primary-darker" />
      </button>
      
      {/* News content container with swipe gesture support */}
      <div 
        className="w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {newsData.komnews.map((komnews, index) => (
          <div
            key={komnews.id || index}
            className={`w-full max-h-max md:max-h-[400px] rounded-[15px] bg-white shadow-card flex flex-col md:flex-row transition-opacity duration-500 p-4 md:p-6 lg:py-14 lg:px-8 ${
              index === currentNewsIndex ? 'opacity-100' : 'hidden opacity-0'
            }`}
          >
            {/* Mobile image - shown only on small screens */}
            <div className="md:hidden w-full h-52 overflow-clip rounded-xl mb-4">
              <img
                src={`${baseUrl}/storage/${komnews.image}`}
                alt={komnews.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/images/placeholder-news.jpg';
                }}
              />
            </div>
            
            {/* Content - full width on mobile, half on desktop */}
            <div className="w-full md:w-1/2 md:p-6 flex flex-col h-full">
              {/* Wrapper untuk judul dan konten dengan overflow */}
              <div className="flex-grow overflow-hidden flex flex-col gap-2 md:gap-4">
                <h3 className="font-bold text-xl md:text-2xl mb-2 md:mb-4">{komnews.title}</h3>
                
                {/* Content dengan sanitasi HTML */}
                <div 
                  className="text-gray-700 overflow-hidden flex-grow text-sm md:text-base"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: "6", 
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis"
                  }}
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(komnews.content || '') }}
                ></div>
              </div>
              
              {/* Tombol dengan posisi kiri bawah */}
              <div className="mt-4 md:mt-6 flex justify-start">
                <ReadMoreButton to={`/komnews/${komnews.slug}`} />
              </div>
            </div>
            
            {/* Desktop image - hidden on mobile, shown on larger screens */}
            <div className="hidden md:block md:w-1/2 overflow-clip rounded-3xl">
              <img
                src={`${baseUrl}/storage/${komnews.image}`}
                alt={komnews.title}
                className="w-full h-[280px] lg:h-[320px] object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/images/placeholder-news.jpg';
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Carousel Navigation Dots */}
      <div className="flex justify-center items-center mt-4">   
        {/* Dots navigation */}
        {newsData.komnews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToNewsSlide(index)}
            className={`mx-1 md:mx-2 w-2 md:w-3 h-2 md:h-3 rounded-full ${
              index === currentNewsIndex ? 'bg-primary-dark' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
        
      </div>
    </div>
  );
};

export default Komnews;