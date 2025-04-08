import React, { useState } from "react";
import TImages from "@/utils/images";
import ReadMoreButton from "@/components/common/ReadMore";
import ScrollReveal from "@/components/common/ScrollReveal";
import { formatDate, timeAgo, truncateText, stripHtml } from "@/utils/formatting";

const HeadlineHeader = () => {
    return(
        <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-10">
            <div className="flex flex-col gap-2 justify-center">
                <h2 className="font-semibold text-3xl md:text-5xl">Today Headline</h2>
                <img 
                  src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR} 
                  alt="garis headline" 
                  className="w-[200px] md:w-[250px]"
                />
            </div>
        </div>
    )
}

/**
 * HeadlineSection Component
 * 
 * Displays featured headlines with switchable main headline.
 * 
 * @param {Object} props
 * @param {Array} props.headlines - List of headline articles
 * @param {string} props.baseUrl - Base URL for API assets
 * @param {boolean} props.loading - Loading state
 * @returns {JSX.Element}
 */
const HeadlineSection = ({ headlines, baseUrl, loading }) => {
    // Handling edge cases
    const headlinesList = headlines || [];
    
    // State untuk active headline
    const [activeHeadlineIndex, setActiveHeadlineIndex] = useState(0);
    const activeHeadline = headlinesList[activeHeadlineIndex] || null;
    
    if (loading) {
        return <div className="text-center py-8">Memuat headline...</div>;
    }
    
    return (
        <div className="mb-8">
            <HeadlineHeader />

            {/* Main Headline Card */}
            {activeHeadline ? (
                <ScrollReveal animation="fade-up">
                    <div className="mt-6 rounded-[15px] bg-white shadow-card overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2 p-6">
                                <div className="mb-2">
                                    <p className="text-xs text-gray-500">
                                        {timeAgo(activeHeadline.created_at)}
                                    </p>
                                </div>
                                
                                <h3 className="font-bold text-xl md:text-2xl mb-4">{activeHeadline.title}</h3>
                                
                                <p className="text-gray-600 line-clamp-4">
                                    {stripHtml(activeHeadline.content).substring(0, 200)}
                                    {activeHeadline.content?.length > 200 ? '...' : ''}
                                </p>
                                
                                <div className="mt-6">
                                    <ReadMoreButton to={`/komnews/${activeHeadline.slug}`} />
                                    
                                    {/* Categories below Read More button */}
                                    {activeHeadline.categories && activeHeadline.categories.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-4">
                                            {activeHeadline.categories.map(category => (
                                                <span 
                                                    key={`tag-${activeHeadline.id}-${category.id}`} 
                                                    className="inline-block bg-primary-light text-primary-dark text-xs px-2 py-1 rounded mr-1"
                                                >
                                                    {category.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="md:w-1/2 h-[250px] md:h-auto">
                                <img
                                    src={`${baseUrl}/storage/${activeHeadline.image}`}
                                    alt={activeHeadline.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/images/placeholder-news.jpg';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Secondary Headlines */}
                    {headlinesList.length > 1 && (
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            {headlinesList.map((headline, index) => (
                                <div 
                                    key={`headline-${headline.id}`} 
                                    className={`rounded-lg shadow-card bg-white p-3 cursor-pointer transition-all duration-300
                                              ${activeHeadlineIndex === index 
                                                  ? 'border-b-2 border-primary font-medium' 
                                                  : 'opacity-75 hover:opacity-100'}`}
                                    onClick={() => setActiveHeadlineIndex(index)}
                                >
                                    <h4 className="text-xs line-clamp-2 font-medium">{headline.title}</h4>
                                    <p className="text-[10px] text-gray-500 mt-1">
                                        {timeAgo(headline.created_at)}
                                    </p>
                                    <p className="text-[10px] text-gray-600 line-clamp-2 mt-1">
                                        {stripHtml(headline.content).substring(0, 50)}...
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollReveal>
            ) : (
                <div className="h-64 flex items-center justify-center bg-gray-100 rounded-[15px] mt-6">
                    <p className="text-gray-500">Tidak ada headline saat ini.</p>
                </div>
            )}
        </div>
    );
};

export default HeadlineSection;