import React, { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ScrollReveal from '@/components/common/ScrollReveal';
import ReadMoreButton from '@/components/common/ReadMore';
import LoadingSpinner from '@/components/common/LoadingSpinner';

/**
 * Community Card Component
 * 
 * Displays individual community information in a card format
 * 
 * @param {Object} props
 * @param {Object} props.community - Community data object
 * @param {Object} props.details - Additional community details
 * @param {boolean} props.loading - Loading state for details
 * @param {string} props.baseUrl - API base URL for assets
 * @returns {JSX.Element}
 */
const CommunityCard = ({ community, details, loading, baseUrl }) => {
  // Truncate description if too long
  const truncateDescription = (desc) => {
    if (!desc) return '';
    return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
  };

  const description = details?.description || '';
  const truncatedDescription = truncateDescription(description);

  return (
    <div className="w-full max-w-[287px] mx-auto h-[400px] rounded-[15px] bg-white shadow-card flex flex-col items-center p-6">
      {/* Logo komunitas */}
      <div className="w-full h-[100px] flex justify-center items-center mb-4">
        <img
          src={`${baseUrl}/storage/${community.logo}`}
          alt={community.name}
          className="w-auto max-h-24 object-contain"
        />
      </div>
      
      {/* Nama komunitas */}
      <h3 className="font-bold text-2xl text-center mb-6">{community.name}</h3>
      
      {/* Deskripsi komunitas */}
      <div className="h-[120px] overflow-hidden mb-auto">
        {loading ? (
          <LoadingSpinner variant="inline" size="small" message="Memuat detail..." />
        ) : (
          <p className="text-center line-clamp-5">
            {truncatedDescription || community.slug}
          </p>
        )}
      </div>
      
      {/* Read More button */}
      <div className="mt-4">
        <ReadMoreButton to={`/community/${community.slug}`} />
      </div>
    </div>
  );
};

/**
 * Ilkommunity Section Component
 * 
 * Displays communities section with responsive carousel for mobile
 * and grid layout for desktop
 * 
 * @param {Object} props
 * @param {Object} props.communitiesData - Communities data from API
 * @param {boolean} props.loadingCommunities - Loading state for communities data
 * @param {Object} props.errorCommunities - Error object from API request
 * @param {Object} props.communityDetails - Detailed information about each community
 * @param {boolean} props.loadingDetails - Loading state for community details
 * @param {number} props.currentCommunityIndex - Current active slide index
 * @param {Function} props.goToCommunitySlide - Function to navigate to specific slide
 * @param {Function} props.setCommunityCarouselPause - Function to pause/resume carousel
 * @param {string} props.baseUrl - API base URL for assets
 * @returns {JSX.Element}
 */
const Ilkomunity = ({
  communitiesData,
  loadingCommunities,
  errorCommunities,
  communityDetails,
  loadingDetails,
  currentCommunityIndex,
  goToCommunitySlide,
  setCommunityCarouselPause,
  baseUrl
}) => {
  const sliderRef = useRef(null);
  
  // Pause carousel on mouse enter
  const handleMouseEnter = () => setCommunityCarouselPause(true);
  const handleMouseLeave = () => setCommunityCarouselPause(false);
  
  // Handle loading and error states
  if (loadingCommunities) {
    return <div className="text-center py-8">Memuat data komunitas...</div>;
  }

  if (errorCommunities) {
    return <div className="text-center py-8 text-red-500">Gagal memuat data komunitas</div>;
  }

  if (!communitiesData?.communities || communitiesData.communities.length === 0) {
    return <div className="text-center py-8">Tidak ada data komunitas</div>;
  }

  return (
    <ScrollReveal animation="fade-up">
      <div className="flex flex-col items-center max-w-6xl mx-auto py-12">
        {/* Desktop view - grid layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {communitiesData.communities.map((community) => (
            <CommunityCard
              key={community.id || `community-${community.slug}`}
              community={community}
              details={communityDetails[community.slug]}
              loading={loadingDetails}
              baseUrl={baseUrl}
            />
          ))}
        </div>
        
        {/* Mobile carousel */}
        <div 
          className="block md:hidden relative w-full mx-auto mb-8" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={sliderRef}
            className="flex overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-300 ease-out w-full"
              style={{ transform: `translateX(-${currentCommunityIndex * 100}%)` }}
            >
              {communitiesData.communities.map((community) => (
                <div 
                  key={community.id || `community-mobile-${community.slug}`} 
                  className="w-full min-w-full flex-shrink-0 flex justify-center"
                >
                  <CommunityCard
                    community={community}
                    details={communityDetails[community.slug]}
                    loading={loadingDetails}
                    baseUrl={baseUrl}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="absolute top-1/2 -left-2 sm:-left-6 -translate-y-1/2">
            <button 
              onClick={() => {
                const items = communitiesData?.communities || [];
                const newIndex = currentCommunityIndex === 0 ? items.length - 1 : currentCommunityIndex - 1;
                goToCommunitySlide(newIndex);
              }}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md focus:outline-none border border-gray-200"
              aria-label="Previous community"
            >
              <FiChevronLeft size={24} className="text-primary-dark" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-2 sm:-right-6 -translate-y-1/2">
            <button 
              onClick={() => {
                const items = communitiesData?.communities || [];
                const newIndex = currentCommunityIndex === items.length - 1 ? 0 : currentCommunityIndex + 1;
                goToCommunitySlide(newIndex);
              }}
              className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md focus:outline-none border border-gray-200"
              aria-label="Next community"
            >
              <FiChevronRight size={24} className="text-primary-dark" />
            </button>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-6 gap-2">
            {communitiesData.communities.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => goToCommunitySlide(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === currentCommunityIndex ? 'bg-primary-dark' : 'bg-gray-300'
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

export default Ilkomunity;