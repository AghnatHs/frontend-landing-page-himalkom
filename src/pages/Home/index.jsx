import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Import custom hooks
import { useFetchData } from '../../hooks/useAPI';
import { useCarousel } from '../../hooks/useCarousel';

// Import komponen yang bisa dipakai ulang
import SectionHeader from '../../components/common/SectionHeader';

// Import sections untuk halaman Home
import HeroSection from './sections/HeroSection';
import Ilkomunity from './sections/Ilkommunity';
import Megaproker from './sections/Megaproker';
import Komnews from './sections/KomNews';

/**
 * Halaman utama (Home)
 */
const Home = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  // Data dari API
  const { data: communitiesData, loading: loadingCommunities, error: errorCommunities } = useFetchData('communities', baseUrl);
  const { data: megaprokerData, loading: loadingMegaproker, error: errorMegaproker } = useFetchData('megaprokers', baseUrl);
  const { data: newsData, loading: loadingNews, error: errorNews } = useFetchData('komnews', baseUrl);

  // State untuk communities
  const [communityDetails, setCommunityDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  
  // Carousel controls
  const { 
    currentIndex: currentNewsIndex,
    goToSlide: goToNewsSlide
  } = useCarousel(newsData?.komnews);
  
  const { 
    currentIndex: currentCommunityIndex, 
    goToSlide: goToCommunitySlide,
    setPause: setCommunityCarouselPause
  } = useCarousel(communitiesData?.communities);

  // Toggle community description
  const toggleDescription = useCallback((slug) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  }, []);

  // Fetch detailed data untuk setiap komunitas
  useEffect(() => {
    if (!communitiesData?.communities) return;

    setLoadingDetails(true);
    
    // Buat array promises untuk semua fetch detail komunitas
    const detailPromises = communitiesData.communities.map(community => 
      axios.get(`${baseUrl}/communities/${community.slug}`)
        .then(response => ({ 
          slug: community.slug, 
          data: response.data.community 
        }))
        .catch(error => {
          console.error(`Error fetching details for ${community.slug}:`, error);
          return { slug: community.slug, data: null };
        })
    );
    
    // Tunggu semua fetch selesai
    Promise.all(detailPromises)
      .then(results => {
        const details = {};
        results.forEach(result => {
          if (result.data) {
            details[result.slug] = result.data;
          }
        });
        setCommunityDetails(details);
      })
      .catch(error => {
        console.error('Error processing community details:', error);
      })
      .finally(() => {
        setLoadingDetails(false);
      });
  }, [communitiesData, baseUrl]);

  // Pause carousel saat deskripsi diperluas
  useEffect(() => {
    if (!communitiesData?.communities) return;
    
    const currentSlug = communitiesData.communities[currentCommunityIndex]?.slug;
    if (currentSlug && expandedDescriptions[currentSlug]) {
      setCommunityCarouselPause(true);
    } else {
      setCommunityCarouselPause(false);
    }
  }, [expandedDescriptions, currentCommunityIndex, communitiesData, setCommunityCarouselPause]);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Communities Section */}
      <section className="px-4 flex flex-col mt-[400px]">
        <SectionHeader title="ILKOMMUNITY" altText="Garis Ilkommunity" />
        <Ilkomunity
          communitiesData={communitiesData}
          loadingCommunities={loadingCommunities}
          errorCommunities={errorCommunities}
          communityDetails={communityDetails}
          loadingDetails={loadingDetails}
          expandedDescriptions={expandedDescriptions}
          toggleDescription={toggleDescription}
          currentCommunityIndex={currentCommunityIndex}
          goToCommunitySlide={goToCommunitySlide}
          baseUrl={baseUrl}
        />
      </section>

      {/* Megaproker Section */}
      <section className="px-4 flex flex-col mt-[200px]">
        <SectionHeader title="MEGAPROKER" altText="Garis Megaproker" />
        <Megaproker 
          megaprokerData={megaprokerData}
          loadingMegaproker={loadingMegaproker}
          errorMegaproker={errorMegaproker}
          baseUrl={baseUrl}
        />
      </section>

      {/* KOMnews Section */}
      <section className="px-4 flex flex-col my-[200px]">
        <SectionHeader title="BERITA TERKINI" altText="Garis Berita" />
        <Komnews 
          newsData={newsData}
          loadingNews={loadingNews}
          errorNews={errorNews}
          currentNewsIndex={currentNewsIndex}
          goToNewsSlide={goToNewsSlide}
          baseUrl={baseUrl}
        />
      </section>
    </>
  );
};

export default Home;