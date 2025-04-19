import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchData } from '@/hooks/useAPI';
import { formatDate, timeAgo } from '@/utils/formatting';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MotionReveal from '@/components/common/MotionReveal';
import TImages from '@/utils/images';
import DOMPurify from 'dompurify';
import { FaArrowLeft } from 'react-icons/fa';

// Import section dari Komnews
import NotFound from '../../NotFound';

/**
 * News Detail Component
 * 
 * Displays a single news article with its details and a list of other news articles
 */
const NewsDetail = () => {
    const { slug } = useParams();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [activeCategory, setActiveCategory] = useState('all');

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [slug]);

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

    const news = newsData?.komnews;
    
    if (errorNews || !news) {
        return <NotFound/>;
    }

    return (
        <div className="w-full">
            {/* Content Section */}
            <section className="mt-24 sm:mt-28 md:mt-32 mb-16 sm:mb-32 md:mb-64">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    {/* Back button - Mobile friendly */}
                    <MotionReveal animation="fade-up">
                        <Link 
                            to="/komnews" 
                            className="inline-flex items-center gap-2 text-primary-darker hover:text-primary-dark transition mb-6 text-sm sm:text-base"
                        >
                            <FaArrowLeft size={14} />
                            <span>Kembali ke berita</span>
                        </Link>
                    </MotionReveal>
                    
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                        {/* Left Column - News Detail */}
                        <div className="lg:w-2/3">
                            <MotionReveal animation="fade-up">
                                <div className="bg-white shadow-card rounded-xl md:rounded-2xl overflow-hidden">
                                    {/* News Header */}
                                    <div className="p-4 sm:p-5 md:p-6">
                                        {/* Title - Better sizing for mobile */}
                                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                                            {news.title}
                                        </h1>

                                        {/* Garis Hero */}
                                        <div className="w-[120px] sm:w-[150px] md:w-[200px] mb-3">
                                            <img
                                                src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
                                                alt="Garis Hero"
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Date - Better styling */}
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {formatDate(news.created_at)}
                                        </p>
                                    </div>

                                    {/* News Image - Better height for mobile */}
                                    <div className="relative w-full h-[220px] sm:h-[280px] md:h-[400px] overflow-hidden">
                                        <img
                                            src={`${baseUrl}/storage/${news.image}`}
                                            alt={news.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/images/placeholder-news.jpg';
                                            }}
                                        />
                                        
                                        {/* Gradient Overlay - Better gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        
                                        {/* Categories - Positioned at bottom right of image */}
                                        {news.categories && news.categories.length > 0 && (
                                            <div className="absolute bottom-3 right-3 z-10">
                                                <span className="inline-block bg-primary-light text-primary-dark text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                                                    {news.categories[0].name}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </MotionReveal>

                            {/* Content - Better typography for mobile */}
                            <MotionReveal animation="fade-up" delay={0.2}>
                                <div className="bg-white shadow-card rounded-xl p-4 sm:p-6 mt-4 sm:mt-6">
                                    <div
                                        className="prose prose-sm sm:prose max-w-none text-gray-800"
                                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(news.content) }}
                                    ></div>
                                </div>
                            </MotionReveal>
                        </div>

                        {/* Right Column - News List Section */}
                        <div className="lg:w-1/3 mt-8 lg:mt-0">
                            <MotionReveal animation="fade-up" delay={0.3}>
                                <div className="bg-white shadow-card rounded-xl overflow-hidden">
                                    <h3 className="text-lg sm:text-xl font-semibold p-4 sm:p-5 border-b border-gray-100">
                                        Berita Lainnya
                                    </h3>
                                    
                                    {loadingAllNews ? (
                                        <div className="text-center py-6">
                                            <LoadingSpinner variant="inline" size="small" message="Memuat berita..." />
                                        </div>
                                    ) : errorAllNews ? (
                                        <div className="text-center py-6 text-red-500 px-4">
                                            Gagal memuat berita
                                        </div>
                                    ) : (
                                        <div className="p-4">
                                            {filteredNews.length > 0 ? (
                                                <div className="space-y-4">
                                                    {filteredNews.slice(0, 5).map((item) => (
                                                        <div key={item.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                                            <Link 
                                                                to={`/komnews/${item.slug}`}
                                                                className="group block"
                                                            >
                                                                <h4 className="font-medium text-sm sm:text-base line-clamp-2 group-hover:text-primary-dark transition-colors">
                                                                    {item.title}
                                                                </h4>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {timeAgo(item.created_at)}
                                                                </p>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-center text-gray-500 text-sm py-4">
                                                    Tidak ada berita lainnya
                                                </p>
                                            )}
                                            
                                            <div className="mt-6 text-center">
                                                <Link 
                                                    to="/komnews" 
                                                    className="inline-block px-4 py-2 bg-primary-light text-primary-dark hover:bg-primary-dark hover:text-white transition-colors rounded-full text-sm font-medium"
                                                >
                                                    Lihat semua berita
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </MotionReveal>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewsDetail;