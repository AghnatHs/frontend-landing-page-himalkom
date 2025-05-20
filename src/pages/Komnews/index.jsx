import React, { useState, useMemo } from "react";
import { useFetchData } from "@/hooks/useAPI";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MotionReveal from "@/components/common/MotionReveal";

// Sections
import HeroSection from "./section/Hero";
import HeadlineSection from "./section/Headline";
import NewsListSection from "./section/NewsList";

/**
 * KomNews Page Component
 *
 * Displays news articles from HIMALKOM with filtering by categories
 */
const Komnews = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch news data
  const {
    data: newsData,
    loading: loadingNews,
    error: errorNews,
  } = useFetchData("komnews", baseUrl);

  // Filter news by category
  const filteredNews = useMemo(() => {
    if (!newsData?.komnews) return [];

    if (activeCategory === "all") {
      return newsData.komnews;
    }

    return newsData.komnews.filter((news) =>
      news.categories.some((category) => category.slug === activeCategory)
    );
  }, [newsData, activeCategory]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="mt-12 md:mt-32">
        <HeroSection />
      </section>

      {/* Headline Section */}
      <section className="md:mt-64 mt-24 mb-16 max-w-6xl mx-auto px-4">
        {loadingNews ? (
          <LoadingSpinner
            variant="section"
            size="medium"
            message="Memuat berita..."
          />
        ) : errorNews ? (
          <div className="text-red-500 text-center py-8 bg-red-50 rounded-lg">
            <p>Gagal memuat berita</p>
            <p className="text-sm mt-2">{errorNews}</p>
          </div>
        ) : newsData ? (
          <MotionReveal animation="fade-up">
            <div className="flex flex-col gap-8">
              {/* News Headlines */}
              <HeadlineSection
                headlines={newsData?.todayHeadlines || []}
                baseUrl={baseUrl}
                loading={loadingNews}
              />
            </div>
          </MotionReveal>
        ) : null}
      </section>

      {/* News List Section - now below headline, as grid */}
      <section className="mb-64 max-w-6xl mx-auto px-4">
        {!loadingNews && !errorNews && newsData && (
          <NewsListSection
            news={filteredNews}
            categories={newsData?.categories || []}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            baseUrl={baseUrl}
          />
        )}
      </section>
    </div>
  );
};

export default Komnews;
