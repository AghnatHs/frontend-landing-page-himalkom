import React, { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReadMoreButton from '@/components/common/ReadMore';
import MotionReveal from '@/components/common/MotionReveal';
import DOMPurify from 'dompurify';
import { timeAgo } from '@/utils/formatting';

/**
 * KomNews Section Component
 * 
 * Displays latest news in a responsive carousel with swipe support
 * 
 * @param {Object} props
 * @param {Object} props.newsData - News data from API
 * @param {boolean} props.loadingNews - Loading state
 * @param {Object} props.errorNews - Error object from API request
 * @param {number} props.currentNewsIndex - Current active slide index
 * @param {Function} props.goToNewsSlide - Function to navigate to specific slide
 * @param {string} props.baseUrl - API base URL for assets
 * @returns {JSX.Element}
 */
const Komnews = ({ 
  newsData, 
  loadingNews, 
  errorNews, 
  currentNewsIndex, 
  goToNewsSlide, 
  baseUrl 
}) => {
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Touch event handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };
  
  // Swipe handler for touch navigation
  const handleSwipe = () => {
    if (!newsData?.komnews?.length) return;
    
    const minSwipeDistance = 50;
    const swipeDistance = touchEndX.current - touchStartX.current;
    
    if (swipeDistance > minSwipeDistance) {
      const prevIndex = (currentNewsIndex - 1 + newsData.komnews.length) % newsData.komnews.length;
      goToNewsSlide(prevIndex);
    } else if (swipeDistance < -minSwipeDistance) {
      const nextIndex = (currentNewsIndex + 1) % newsData.komnews.length;
      goToNewsSlide(nextIndex);
    }
  };
  
  // HTML sanitization to prevent XSS attacks
  const sanitizeHtml = (html) => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
  };

  // Handle states
  if (loadingNews) {
    return <div className="text-center py-8">Memuat berita...</div>;
  }

  if (errorNews) {
    return <div className="text-center py-8 text-red-500">Gagal memuat berita</div>;
  }

  if (!newsData?.komnews || newsData.komnews.length === 0) {
    return <div className="text-center py-8">Tidak ada berita terkini</div>;
  }


  return (
    <MotionReveal animation="fade-up" delay={0.3}>
      <div className="flex flex-col items-center max-w-6xl mx-auto py-12">
        {/* Main carousel container */}
        <div 
          className="relative w-full overflow-visible" 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          ref={sliderRef}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out w-full"
              style={{ transform: `translateX(-${currentNewsIndex * 100}%)` }}
            >
              {newsData.komnews.map((komnews, index) => (
                <div 
                  key={komnews.id || `news-${index}`} 
                  className="w-full min-w-full flex-shrink-0 px-4 md:px-0"
                >
                  <div className="rounded-[15px] bg-white shadow-card h-[550px] md:h-[400px] flex flex-col md:flex-row p-6 mx-auto md:mx-0 max-w-[90%] md:max-w-full">
                    
                    {/* Mobile image */}
                    <div className="md:hidden w-full h-[180px] overflow-clip rounded-xl mb-4">
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
                    
                    {/* Content area */}
                    <div className="w-full md:w-1/2 md:pr-6 flex flex-col h-full">
                      <h3 className="font-bold text-xl md:text-2xl mb-2 line-clamp-2">{komnews.title}</h3>
                      
                      <p className="text-sm text-gray-500 mb-2">
                        {timeAgo(komnews.created_at)}
                      </p>
                      
                      <div className="h-[180px] overflow-hidden mb-auto">
                        <div 
                          className="text-gray-700 text-sm md:text-base line-clamp-6"
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(komnews.content || '') }}
                        ></div>
                      </div>
                      
                      <div className="mt-4 md:mt-auto pt-4 w-1/2">
                        <ReadMoreButton to={`/komnews/${komnews.slug}`} />
                      </div>
                    </div>
                    
                    {/* Desktop image */}
                    <div className="hidden md:block md:w-1/2 h-full overflow-clip rounded-xl">
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
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Prev button */}
          <div className="absolute top-1/2 -left-2 sm:-left-6 -translate-y-1/2 z-10">
            <button 
              onClick={() => {
                const prevIndex = (currentNewsIndex - 1 + newsData.komnews.length) % newsData.komnews.length;
                goToNewsSlide(prevIndex);
              }}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none border border-gray-200"
              aria-label="Previous news"
            >
              <FiChevronLeft size={24} className="text-primary-dark" />
            </button>
          </div>
          
          {/* Next button */}
          <div className="absolute top-1/2 -right-2 sm:-right-6 -translate-y-1/2 z-10">
            <button 
              onClick={() => {
                const nextIndex = (currentNewsIndex + 1) % newsData.komnews.length;
                goToNewsSlide(nextIndex);
              }}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none border border-gray-200"
              aria-label="Next news"
            >
              <FiChevronRight size={24} className="text-primary-dark" />
            </button>
          </div>
        </div>
        
        {/* Indicator dots */}
        <div className="flex justify-center items-center mt-6 gap-2">   
          {newsData.komnews.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => goToNewsSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentNewsIndex ? 'bg-primary-dark' : 'bg-primary-light'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </MotionReveal>
  );
};

export default Komnews;