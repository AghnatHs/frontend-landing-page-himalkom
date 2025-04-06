import React, { useState } from 'react';

// Hooks
import { useFetchData } from '@/hooks/useAPI';

// Components
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Sections
import HeroSection from './section/Hero';
import HeadlineSection from './section/Headline';
import NewsListSection from './section/NewsList';

/**
 * KomNews Page Component
 * 
 * Displays news articles from HIMALKOM with filtering by categories
 * 
 * @returns {JSX.Element}
 */
const Komnews = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Fetch news data
  const { 
    data: newsData, 
    loading: loadingNews, 
    error: errorNews 
  } = useFetchData('komnews', baseUrl);

  // Filter news by category
  const filteredNews = React.useMemo(() => {
    if (!newsData?.komnews) return [];
    
    if (activeCategory === 'all') {
      return newsData.komnews;
    }
    
    return newsData.komnews.filter(news => 
      news.categories.some(category => category.slug === activeCategory)
    );
  }, [newsData, activeCategory]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="mt-24 md:mt-32">
        <HeroSection />
      </section>

      {/* Content Section */}
      <section className="mt-64 mb-64 max-w-6xl mx-auto px-4">
        {loadingNews ? (
          <LoadingSpinner variant="inline" size="medium" message="Memuat berita..." />
        ) : errorNews ? (
          <div className="text-red-500 text-center py-8">Error: {errorNews}</div>
        ) : newsData ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <HeadlineSection 
                headlines={newsData?.todayHeadlines || []}
                baseUrl={baseUrl}
                loading={loadingNews}
              />
            </div>
            <div className="lg:w-1/3">
              <NewsListSection 
                news={filteredNews}
                categories={newsData?.categories || []}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                baseUrl={baseUrl}
              />
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default Komnews;