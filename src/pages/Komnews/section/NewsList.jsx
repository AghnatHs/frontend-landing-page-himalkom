import React from "react";
import { Link } from "react-router-dom";
import { timeAgo, stripHtml } from "@/utils/formatting";
import TImages from "@/utils/images";
import MotionReveal from "@/components/common/MotionReveal";

/**
 * Categories Filter Component
 * 
 * @param {Object} props
 * @param {Array} props.categories - Available categories
 * @param {string} props.activeCategory - Currently active category
 * @param {Function} props.setActiveCategory - Function to change active category
 * @returns {JSX.Element}
 */
const CategoriesFilter = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {/* All category option */}
            <div
                onClick={() => setActiveCategory('all')}
                className={`flex items-center px-3 py-1 shadow-card bg-white rounded-md cursor-pointer ${activeCategory === 'all' ? 'bg-primary-dark text-white' : ''
                    }`}
            >
                <p className="font-normal text-xs md:text-sm">All</p>
            </div>

            {/* Dynamic categories */}
            {categories.map((item, index) => (
                <div
                    key={`topic-${index}`}
                    className={`flex items-center px-3 py-1 shadow-card bg-white rounded-md cursor-pointer ${activeCategory === item.slug ? 'bg-primary-dark text-white' : ''
                        }`}
                    onClick={() => setActiveCategory(item.slug)}
                >
                    <p className="font-normal text-xs md:text-sm">{item.name}</p>
                </div>
            ))}
        </div>
    );
}

/**
 * NewsListSection Component
 * 
 * Displays filtered news list with category filters
 * 
 * @param {Object} props
 * @param {Array} props.news - News articles
 * @param {Array} props.categories - Available categories
 * @param {string} props.activeCategory - Currently active category
 * @param {Function} props.setActiveCategory - Function to change active category
 * @param {string} props.baseUrl - Base URL for API assets
 * @param {boolean} props.compactView - Whether to show in compact mode (no category filters)
 * @returns {JSX.Element}
 */
const NewsListSection = ({
    news,
    categories,
    activeCategory,
    setActiveCategory,
    baseUrl,
    compactView = false
}) => {
    // Konstanta untuk batasan panjang judul
    const SHORT_TITLE_LENGTH = 40;  // Judul dianggap pendek jika <= 40 karakter
    const LONG_TITLE_LENGTH = 65;   // Judul dianggap sangat panjang jika > 65 karakter

    /**
     * Menentukan apakah harus menampilkan deskripsi berdasarkan panjang judul
     * @param {string} title - Judul berita
     * @returns {boolean} - True jika deskripsi harus ditampilkan
     */
    const shouldShowDescription = (title) => {
        return title.length <= SHORT_TITLE_LENGTH;
    };

    /**
     * Truncate judul jika terlalu panjang
     * @param {string} title - Judul berita
     * @returns {string} - Judul yang sudah di-truncate jika perlu
     */
    const formatTitle = (title) => {
        if (title.length > LONG_TITLE_LENGTH) {
            return title.substring(0, LONG_TITLE_LENGTH) + '...';
        }
        return title;
    };

    return (
        <div>
            {/* Filter kategori hanya ditampilkan jika tidak dalam compact view */}
            {!compactView && (
                <MotionReveal animation="fade-up">
                    <CategoriesFilter
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                </MotionReveal>
            )}

            {/* Main news container */}
            <MotionReveal 
                animation="fade-up" 
                delay={0.3} 
                key={`news-list-${activeCategory}`} // This forces re-render when category changes
            >
                <div className="bg-white rounded-xl shadow-card p-4">
                    {news && news.length > 0 ? (
                        news.map((newsItem, index) => (
                            <React.Fragment key={`news-list-${newsItem.id}`}>
                                {/* News item */}
                                <div className="py-4">
                                    <Link to={`/komnews/${newsItem.slug}`} className={compactView ? "block" : "flex gap-3"}>
                                        {/* Konten */}
                                        <div className="flex-1">
                                            <h4 className={`font-bold ${compactView ? "text-base" : "text-sm"} line-clamp-2`}>
                                                {formatTitle(newsItem.title)}
                                            </h4>

                                            <p className="text-xs text-gray-500 mt-1">
                                                {timeAgo(newsItem.created_at)}
                                            </p>

                                            {shouldShowDescription(newsItem.title) && (
                                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                    {stripHtml(newsItem.content).substring(0, 80)}...
                                                </p>
                                            )}
                                        </div>

                                        {/* Gambar (hanya ditampilkan jika bukan compact view) */}
                                        {!compactView && (
                                            <div className="w-20 h-20 flex-shrink-0">
                                                <img
                                                    src={`${baseUrl}/storage/${newsItem.image}`}
                                                    alt={newsItem.title}
                                                    className="w-full h-full object-cover rounded"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/images/placeholder-news.jpg';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </Link>
                                </div>

                                {/* Separator (except for last item) */}
                                {index < news.slice(0, 5).length - 1 && (
                                    <div className="flex justify-center py-2">
                                        <img
                                            src={TImages.DECORATIVE_ELEMENTS.GARIS_KOMNEWS}
                                            alt="pembatas berita"
                                            className="w-full max-w-[200px] opacity-70"
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <div className="text-center py-4 text-gray-500">
                            Tidak ada berita dalam kategori ini
                        </div>
                    )}
                </div>
            </MotionReveal>
        </div>
    );
};

export default NewsListSection;