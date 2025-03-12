import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TImages from '../utils/images';

// Custom hook cuy
const useFetchData = (endpoint, baseUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}/${endpoint}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [endpoint, baseUrl]);

  return { data, loading, error };
};

// Section header component
const SectionHeader = ({ title, altText }) => (
  <div className='flex flex-col items-center mb-24'>
    <h1 className="text-3xl font-bold text-center text-[32px] leading-11">{title}</h1>
    <img
      src={TImages.DECORATIVE_ELEMENTS.GARIS_ILKOMMUNITY}
      alt={altText}
      className="w-[150px] mb-4"
    />
  </div>
);

// News carousel controller hook
const useCarousel = (items) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      ));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [items]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return { currentIndex, goToSlide };
};

const Home = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  // Fetch data using custom hook
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

  // Setup carousel for news
  const { 
    currentIndex: currentNewsIndex,
    goToSlide
  } = useCarousel(newsData?.komnews);

  return (
    <>
      {/* Hero Section */}
      <section className="">
        <div
          id="hero-section"
          className="flex justify-center gap-24 items-center mt-64 w-full px-4"
        >
          <img
            src={TImages.LOGO.LOGO_HIMALKOM}
            alt="Logo Himalkom"
            className="w-52"
          />
          <div className="flex flex-col text-left">
            <h1 className="font-semibold text-black text-[110px] leading-24 sm:text-[90px] md:text-[110px] sm:w-[300px] md:w-[363px]">
              Elevor
            </h1>
            <img
              src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
              alt="Garis Elevor"
              className="w-[361px] mb-4"
            />
            <div className="flex flex-col text-black text-2xl font-normal">
              <span>Elevate, Invest, Opportunity</span>
              <span>Himpunan Mahasiswa Ilmu Komputer 2024/2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="px-4 flex flex-col mt-[400px]">
        <SectionHeader title="ILKOMMUNITY" altText="Garis Ilkommunity" />
        
        {loadingCommunities && <p className="text-center">Loading communities...</p>}
        {errorCommunities && <p className="text-red-500 font-bold text-xl text-center">Error: {errorCommunities}</p>}
        
        {communitiesData && communitiesData.communities && (
          <div className="grid grid-cols-1 gap-11 justify-items-center mx-auto max-w-6xl sm:grid-cols-2 md:grid-cols-4">
            {communitiesData.communities.map((community) => (
              <div
                key={community.slug}
                className="max-w-[287px] max-h-[342px] flex-shrink-0 rounded-[15px] bg-white shadow-[0px_0px_8px_0.3px_rgba(105,83,207,0.39)] flex flex-col items-center justify-center px-18 py-10"
              >
                <img
                  src={`${baseUrl}/storage/${community.logo}`}
                  alt={community.name}
                  className="w-28 h-28 object-cover mb-2"
                />
                <h3 className="font-bold text-2xl">{community.name}</h3>
                <p>{community.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Megaproker Section */}
      <section className="px-4 flex flex-col mt-[200px]">
        <SectionHeader title="MEGAPROKER" altText="Garis Megaproker" />
        
        {loadingMegaproker && <p className="text-center">Loading megaproker...</p>}
        {errorMegaproker && <p className="text-red-500 font-bold text-xl text-center">Error: {errorMegaproker}</p>}
        
        {megaprokerData && megaprokerData.megaprokers && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-18 justify-items-center mx-auto max-w-6xl">
            {megaprokerData.megaprokers.map((megaproker) => (
              <div
                key={megaproker.id || megaproker.slug}
                className="w-full max-w-[557px] max-h-[274px] rounded-[15px] bg-white shadow-[0px_0px_8px_0.3px_rgba(105,83,207,0.39)] flex items-center justify-evenly p-6 md:p-11"
              >
                <img
                  src={`${baseUrl}/storage/${megaproker.logo}`}
                  alt={megaproker.name}
                  className="max-w-56 max-h-44 object-cover mr-12"
                />
                <div className='flex flex-col items-center gap-2'>
                  <h3 className="font-bold text-xl md:text-2xl leading-11">{megaproker.name}</h3>
                  <button className='px-2 py-1 text-sm rounded-sm bg-white shadow-[0px_0px_8px_0.3px_rgba(105,83,207,0.39)] cursor-pointer transition-all hover:shadow-[0px_0px_8px_2px_rgba(105,83,207,0.39)]'>
                    Selengkapnya
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* KOMnews Section */}
      <section className="px-4 flex flex-col my-[200px]">
        <SectionHeader title="BERITA TERKINI" altText="Garis Berita" />
        
        {loadingNews && <p className="text-center">Loading news...</p>}
        {errorNews && <p className="text-red-500 font-bold text-xl text-center">Error: {errorNews}</p>}
        
        {newsData && newsData.komnews && (
          <div className="relative mx-auto max-w-6xl">
            <div className="w-full">
              {newsData.komnews.map((komnews, index) => (
                <div
                  key={komnews.id || index}
                  className={`w-full max-h-[350px] rounded-[15px] bg-white shadow-[0px_0px_8px_0.3px_rgba(105,83,207,0.39)] flex transition-opacity duration-500 ${
                    index === currentNewsIndex ? 'opacity-100' : 'hidden opacity-0'
                  }`}
                >
                  <div className="w-1/2 p-8 flex flex-col justify-center">
                    <h3 className="font-bold text-2xl mb-4">{komnews.title}</h3>
                    <div className="text-gray-700 line-clamp-4" dangerouslySetInnerHTML={{ __html: komnews.excerp }}></div>
                    <button className='mt-6 self-start px-4 py-2 text-sm rounded-sm bg-white shadow-[0px_0px_8px_0.3px_rgba(105,83,207,0.39)] cursor-pointer transition-all hover:shadow-[0px_0px_8px_2px_rgba(105,83,207,0.39)]'>
                      Baca Selengkapnya
                    </button>
                  </div>
                  <div className="w-1/2">
                    <img
                      src={`${baseUrl}/storage/${komnews.image}`}
                      alt={komnews.title}
                      className="w-full h-[350px] object-cover rounded-r-[15px]"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Navigation Dots */}
            <div className="flex justify-center mt-4">
              {newsData.komnews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`mx-2 w-3 h-3 rounded-full ${
                    index === currentNewsIndex ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;