import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MotionReveal from '@/components/common/MotionReveal';

// Custom hooks
import { useFetchData } from '@/hooks/useAPI';
import { useCarousel } from '@/hooks/useCarousel';

// Common components
import SectionHeader from '@/components/common/SectionHeader';

// Page sections
import HeroSection from './sections/HeroSection';
import Ilkomunity from './sections/Ilkommunity';
import Megaproker from './sections/Megaproker';
import Komnews from './sections/KomNews';

/**
 * Home Page Component
 * 
 * Main landing page of HIMALKOM website featuring:
 * - Hero section
 * - Communities section
 * - Major programs/events section
 * - Latest news section
 * 
 * @returns {JSX.Element}
 */
const Home = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch all required data using custom hook
  const {
    data: communitiesData,
    loading: loadingCommunities,
    error: errorCommunities
  } = useFetchData('communities', baseUrl);

  const {
    data: megaprokerData,
    loading: loadingMegaproker,
    error: errorMegaproker
  } = useFetchData('megaprokers', baseUrl);

  const {
    data: newsData,
    loading: loadingNews,
    error: errorNews
  } = useFetchData('komnews', baseUrl);

  // State for community details
  const [communityDetails, setCommunityDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Initialize carousels with custom hook
  const {
    currentIndex: currentNewsIndex,
    goToSlide: goToNewsSlide
  } = useCarousel(newsData?.komnews);

  const {
    currentIndex: currentCommunityIndex,
    goToSlide: goToCommunitySlide,
    setPause: setCommunityCarouselPause
  } = useCarousel(communitiesData?.communities);

  // Fetch detailed information for each community
  useEffect(() => {
    if (!communitiesData?.communities?.length) return;

    setLoadingDetails(true);

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

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full">
        <MotionReveal animation="fade-up">
          <HeroSection />
        </MotionReveal>
      </section>

      {/* Ilkomunity Section */}
      <section className="px-4 flex flex-col items-center text-center my-[230px]">
        <MotionReveal animation="fade-up">
          <SectionHeader
            title="ILKOMUNITAS"
            altText="Komunitas Ilmu Komputer"
          />
          <Ilkomunity
            communitiesData={communitiesData}
            loadingCommunities={loadingCommunities}
            errorCommunities={errorCommunities}
            communityDetails={communityDetails}
            loadingDetails={loadingDetails}
            currentCommunityIndex={currentCommunityIndex}
            goToCommunitySlide={goToCommunitySlide}
            setCommunityCarouselPause={setCommunityCarouselPause}
            baseUrl={baseUrl}
          />
        </MotionReveal>
      </section>

      {/* Megaproker Section */}
      <section className="px-4 flex flex-col items-center mt-16 md:mt-24">
        <MotionReveal animation="fade-up">
          <SectionHeader
            title="MEGAPROKER"
            altText="Program Kerja Utama"
          />
        </MotionReveal>
        <MotionReveal animation="fade-up" delay={0.2}>
          <Megaproker
            megaprokerData={megaprokerData}
            loadingMegaproker={loadingMegaproker}
            errorMegaproker={errorMegaproker}
            baseUrl={baseUrl}
          />
        </MotionReveal>
      </section>

      {/* Komnews Section */}
      <section className="mt-16 md:mt-24 mb-16 md:mb-24">
        <MotionReveal animation="fade-up">
          <SectionHeader
            title="KOMNEWS"
            altText="Berita dan Aktivitas Terkini"
          />
          <Komnews
            newsData={newsData}
            loadingNews={loadingNews}
            errorNews={errorNews}
            currentNewsIndex={currentNewsIndex}
            goToNewsSlide={goToNewsSlide}
            baseUrl={baseUrl}
          />
        </MotionReveal>
      </section>
    </div>
  );
};

export default Home;