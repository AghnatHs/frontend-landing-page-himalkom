import React from 'react';

/**
 * Card komunitas (komponen internal)
 */
const CommunityCard = ({ 
  community, 
  baseUrl, 
  communityDetails, 
  loadingDetails, 
  expandedDescriptions, 
  toggleDescription 
}) => {
  const hasLongDescription = communityDetails[community.slug]?.description?.length > 120;
  
  return (
    <div className="w-full max-w-[287px] min-h-[250px] rounded-[15px] bg-white shadow-[0px_0px_8px_0.3px_rgba(105,83,207,0.39)] flex flex-col items-center p-6">
      {/* Logo Community */}
      <div className="w-full h-[100px] flex justify-center items-center mb-4">
        <img
          src={`${baseUrl}/storage/${community.logo}`}
          alt={community.name}
          className="w-auto max-h-24 object-contain"
        />
      </div>
      
      {/* Community Name */}
      <h3 className="font-bold text-2xl text-center mb-3">{community.name}</h3>
      
      {/* Community Description */}
      <div className="flex flex-col items-center w-full flex-grow">
        <div className={`overflow-hidden transition-all duration-500 ${
          expandedDescriptions[community.slug] ? 'max-h-[1000px]' : 'max-h-[4.5em]'
        }`}>
          <p className="text-center text-sm">
            {communityDetails[community.slug]?.description || 
             (loadingDetails ? "Loading description..." : community.slug)}
          </p>
        </div>
        
        {/* View More/Less Button */}
        <div className="mt-auto pt-3">
          {hasLongDescription && (
            <button 
              onClick={() => toggleDescription(community.slug)}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all duration-300"
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
  if (loadingCommunities) return <p className="text-center">Loading communities...</p>;
  if (errorCommunities) return <p className="text-red-500 font-bold text-xl text-center">Error: {errorCommunities}</p>;
  if (!communitiesData || !communitiesData.communities) return null;

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

      {/* Mobile View with Carousel */}
      <div className="sm:hidden w-full mx-auto max-w-6xl">
        <div className="relative">
          {communitiesData.communities.map((community, index) => (
            <div
              key={community.slug}
              className={`w-full min-h-[300px] max-h-fit rounded-[15px] bg-white shadow-[0px_0px_8px_0.3px_rgba(105,83,207,0.39)] flex flex-col items-center p-6 transition-opacity duration-500 ${
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
                     (loadingDetails ? "Loading description..." : community.slug)}
                  </p>
                </div>
                <div className="mt-auto pt-3">
                  {communityDetails[community.slug]?.description?.length > 150 && (
                    <button 
                      onClick={() => toggleDescription(community.slug)}
                      className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all duration-300"
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
                  index === currentCommunityIndex ? 'bg-purple-600' : 'bg-gray-300'
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