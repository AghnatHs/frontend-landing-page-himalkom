import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, A11y } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ReadMoreButton from '@/components/common/ReadMore';
import MotionReveal from '@/components/common/MotionReveal';
import DOMPurify from 'dompurify';
import { timeAgo } from '@/utils/formatting';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Komnews = ({
  newsData,
  loadingNews,
  errorNews,
  baseUrl
}) => {
  // Create a ref for the Swiper instance
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // HTML sanitization to prevent XSS attacks
  const sanitizeHtml = (html) => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
  };

  // Create a limited news array
  const limitedNews = newsData?.komnews ? newsData.komnews.slice(0, 5) : [];

  // Handle states
  if (loadingNews) {
    return <div className="text-center py-8">Memuat berita...</div>;
  }

  if (errorNews) {
    return <div className="text-center py-8 text-red-500">Gagal memuat berita</div>;
  }

  if (!limitedNews.length) {
    return <div className="text-center py-8">Tidak ada berita terkini</div>;
  }

  return (
    <MotionReveal animation="fade-up" delay={0.3}>
      <div className="flex flex-col items-center max-w-6xl mx-auto relative">
        <Swiper
          modules={[Pagination, Autoplay, A11y]} // A11y = accessibility features
          spaceBetween={30}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="w-full"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {limitedNews.map((komnews, index) => (
            <SwiperSlide key={komnews.id || `news-${index}`}>
              <div className="px-8">
                <div className="rounded-[15px] bg-white shadow-card h-[550px] md:h-[400px] flex flex-col md:flex-row p-6 mx-auto md:mx-0 my-3 max-w-[90%] md:max-w-full">

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

                    <div className="max-h-[180px] overflow-hidden mb-4">
                      <div
                        className="text-gray-700 text-sm md:text-base line-clamp-6"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(komnews.content || '') }}
                      ></div>
                    </div>

                    <div className="mt-auto pt-4">
                      <div className="max-w-[150px]">
                        <ReadMoreButton to={`/komnews/${komnews.slug}`} />
                      </div>
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
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Controls container - arrows and pagination together */}
        <div className="flex items-center justify-between w-full mt-8 px-10">
          {/* Left arrow */}
          <button 
            onClick={() => swiperRef.current?.slidePrev()} 
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-primary-dark text-sm" />
          </button>
          
          {/* Pagination dots */}
          <div className="flex justify-center items-center gap-3">
            {limitedNews.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => swiperRef.current?.slideTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-primary-dark scale-125' 
                    : 'bg-gray-200 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Right arrow */}
          <button 
            onClick={() => swiperRef.current?.slideNext()} 
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-primary-dark text-sm" />
          </button>
        </div>
      </div>
    </MotionReveal>
  );
};

export default Komnews;