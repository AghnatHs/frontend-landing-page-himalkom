import React, { useRef } from 'react';
import ReadMoreButton from '@/components/common/ReadMore';
import LoadingSpinner from '@/components/common/LoadingSpinner';

/**
 * Card komunitas (komponen internal)
 */
const CommunityCard = ({ 
  community, 
  baseUrl, 
}) => {
  
  return (
    <div className="min-w-64 max-w-[287px] min-h-82 rounded-[15px] bg-white shadow-card flex flex-col items-center p-6">
      {/* Logo Community */}
      <div className="w-full h-[100px] flex justify-center items-center mb-4">
        <img
          src={`${baseUrl}/storage/${community.logo}`}
          alt={community.name}
          className="w-auto max-h-24 object-contain"
        />
      </div>
      
      {/* Community Name */}
      <h3 className="font-bold text-2xl text-center mb-10">{community.name}</h3>
      <ReadMoreButton to={`/ilkomunity/${community.slug}`} />
      
    </div>
  );
};

/**
 * Section komunitas
 */
const Ilkomunity = ({ 
  communitiesData, 
  loadingCommunities, 
  errorCommunities, 
  communityDetails,
  loadingDetails,
  expandedDescriptions, 
  toggleDescription,
  currentCommunityIndex,
  goToCommunitySlide,
  baseUrl
}) => {
  // Untuk loading communities
  if (loadingCommunities) {
    return <LoadingSpinner variant="section" message="Memuat komunitas..." />;
  }
  if (errorCommunities) return <p className="text-red-500 font-bold text-xl text-center">Error: {errorCommunities}</p>;
  if (!communitiesData || !communitiesData.communities) return null;

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
      const prevIndex = (currentCommunityIndex - 1 + communitiesData.communities.length) % communitiesData.communities.length;
      goToCommunitySlide(prevIndex);
    } else if (swipeDistance < -minSwipeDistance) {
      // Swipe left to right (next)
      const nextIndex = (currentCommunityIndex + 1) % communitiesData.communities.length;
      goToCommunitySlide(nextIndex);
    }
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-11 justify-items-center mx-auto max-w-6xl">
        {communitiesData.communities.map((community) => (
          <CommunityCard
            key={community.slug}
            community={community}
            baseUrl={baseUrl}
            communityDetails={communityDetails}
            loadingDetails={loadingDetails}
            expandedDescriptions={expandedDescriptions}
            toggleDescription={toggleDescription}
          />
        ))}
      </div>

      {/* Mobile View with Carousel and Swipe Gesture */}
      <div className="sm:hidden w-full mx-auto max-w-6xl">
        <div 
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {communitiesData.communities.map((community, index) => (
            <div
              key={community.slug}
              className={`w-full min-h-[300px] max-h-fit rounded-[15px] bg-white shadow-card flex flex-col items-center p-6 transition-opacity duration-500 ${
                index === currentCommunityIndex ? 'opacity-100' : 'hidden opacity-0'
              }`}
            >
              <div className="w-full h-[120px] flex justify-center items-center mb-4">
                <img
                  src={`${baseUrl}/storage/${community.logo}`}
                  alt={community.name}
                  className="w-auto max-h-28 object-contain"
                />
              </div>
              <h3 className="font-bold text-2xl text-center mb-3">{community.name}</h3>
              <div className="flex flex-col items-center w-full flex-grow">
                <div className={`overflow-hidden transition-all duration-500 ${
                  expandedDescriptions[community.slug] ? 'max-h-[1000px]' : 'max-h-[6em]'
                }`}>
                  <p className="text-center">
                    {communityDetails[community.slug]?.description || 
                     (loadingDetails ? <LoadingSpinner variant="inline" size="small" message="Memuat detail..." /> : community.slug)}
                  </p>
                </div>
                <div className="mt-auto pt-3">
                  {communityDetails[community.slug]?.description?.length > 150 && (
                    <button 
                      onClick={() => toggleDescription(community.slug)}
                      className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-primary-light text-primary-dark hover:bg-primary/50 transition-all duration-300"
                    >
                      <span>{expandedDescriptions[community.slug] ? 'View Less' : 'View More'}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        className={`transition-transform duration-300 ${expandedDescriptions[community.slug] ? 'rotate-180' : ''}`}
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Navigation Dots */}
          <div className="flex justify-center mt-6">
            {communitiesData.communities.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCommunitySlide(index)}
                className={`mx-2 w-3 h-3 rounded-full ${
                  index === currentCommunityIndex ? 'bg-primary-dark' : 'bg-gray-300'
                }`}
                aria-label={`Go to community ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Ilkomunity;