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
    <div className="home-container font-athiti text-3xl">
      <h1>Welcome to Himalkom</h1>
      <p>This is the home page of the Himalkom website.</p>
      {/* Add more content here as needed */}
    </div>
  );
};

export default Home;