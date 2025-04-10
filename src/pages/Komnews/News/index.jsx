import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchData } from '@/hooks/useAPI';
import { formatDate } from '@/utils/formatting';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MotionReveal from '@/components/common/MotionReveal';
import TImages from '@/utils/images';
import DOMPurify from 'dompurify';

// Import section dari Komnews
import NewsListSection from '../section/NewsList';

/**
 * News Detail Component
 * 
 * Displays a single news article with its details and a list of other news articles
 */
const NewsDetail = () => {
    const { slug } = useParams();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [activeCategory, setActiveCategory] = useState('all');

    // Fetch the specific news article
    const {
        data: newsData,
        loading: loadingNews,
        error: errorNews
    } = useFetchData(`komnews/${slug}`, baseUrl);

    // Fetch other news articles for the sidebar
    const {
        data: allNewsData,
        loading: loadingAllNews,
        error: errorAllNews
    } = useFetchData('komnews', baseUrl);

    // Filter news list untuk menghilangkan berita yang sedang dibuka
    const filteredNews = React.useMemo(() => {
        if (!allNewsData?.komnews) return [];
        return allNewsData.komnews.filter(item => item.slug !== slug);
    }, [allNewsData, slug]);
    
    // HTML sanitization to prevent XSS attacks
    const sanitizeHtml = (html) => {
        if (!html) return '';
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            ALLOWED_ATTR: ['href', 'target', 'rel'],
        });
    };

    if (loadingNews) {
        return <LoadingSpinner variant="page" size="medium" message="Memuat berita..." />;
    }

    if (errorNews) {
        return <div className="text-red-500 text-center py-8">Error: {errorNews}</div>;
    }

    const news = newsData?.komnews;
    if (!news) {
        return <div className="text-center py-8">Berita tidak ditemukan</div>;
    }

    return (
        <div className="w-full">
            {/* Content Section */}
            <section className="mt-32 mb-64 max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-24">
                    {/* Left Column - News Detail */}
                    <div className="lg:w-2/3">
                        <MotionReveal animation="fade-up">
                            <div className="bg-white shadow-card rounded-[15px] overflow-hidden">
                                {/* News Header */}
                                <div className="md:p-6">
                                    {/* Title */}
                                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{news.title}</h1>

                                    {/* Garis Hero */}
                                    <div className="w-[150px] md:w-[200px] mb-2 lg:w-[250px]">
                                        <img
                                            src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
                                            alt="Garis Hero"
                                            className="w-full"
                                        />
                                    </div>

                                    {/* Date */}
                                    <p className="text-md font-medium text-gray-500">{formatDate(news.created_at)}</p>
                                </div>

                                {/* News Image - FULL WIDTH with Gradient Overlay */}
                                <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
                                    {/* Image */}
                                    <img
                                        src={`${baseUrl}/storage/${news.image}`}
                                        alt={news.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/placeholder-news.jpg';
                                        }}
                                    />
                                    
                                    {/* Gradient Overlay - Dark to Transparent */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                                    {/* Categories */}
                                    {news.categories && news.categories.length > 0 && (
                                        <div className="absolute bottom-4 right-4 bg-white shadow-card text-black text-sm px-3 py-1 rounded-lg z-10">
                                            {news.categories[0].name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </MotionReveal>

                        {/* Content */}
                        <MotionReveal animation="fade-up" delay={0.2}>
                            <div
                                className="prose max-w-none mt-6 text-justify text-lg"
                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(news.content) }}
                            ></div>
                        </MotionReveal>
                    </div>

                    {/* Right Column - News List Section */}
                    <div className="lg:w-1/3">
                        <MotionReveal animation="fade-up" delay={0.3}>
                            <h3 className="font-semibold text-xl mb-4">Berita Lainnya</h3>
                            {loadingAllNews ? (
                                <div className="text-center py-4">Memuat berita...</div>
                            ) : errorAllNews ? (
                                <div className="text-center py-4 text-red-500">Gagal memuat berita</div>
                            ) : (
                                <NewsListSection
                                    news={filteredNews}
                                    categories={allNewsData?.categories || []}
                                    activeCategory={activeCategory}
                                    setActiveCategory={setActiveCategory}
                                    baseUrl={baseUrl}
                                    compactView={true}
                                />
                            )}
                        </MotionReveal>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewsDetail;