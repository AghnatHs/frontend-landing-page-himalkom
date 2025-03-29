import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/common/ScrollReveal';

/**
 * Megaproker Section Component
 * 
 * Displays the main programs/events of HIMALKOM in a grid layout
 * 
 * @param {Object} props
 * @param {Object} props.megaprokerData - Megaproker data from API
 * @param {boolean} props.loadingMegaproker - Loading state
 * @param {Object} props.errorMegaproker - Error object from API request
 * @param {string} props.baseUrl - API base URL for assets
 * @returns {JSX.Element}
 */
const Megaproker = ({ megaprokerData, loadingMegaproker, errorMegaproker, baseUrl }) => {
  // Handle states
  if (loadingMegaproker) {
    return <div className="text-center py-8">Memuat data megaproker...</div>;
  }

  if (errorMegaproker) {
    return <div className="text-center py-8 text-red-500">Gagal memuat data megaproker</div>;
  }

  if (!megaprokerData?.megaprokers || megaprokerData.megaprokers.length === 0) {
    return <div className="text-center py-8">Tidak ada data megaproker</div>;
  }

  return (
    <ScrollReveal animation="fade-up">
      <div className="max-w-6xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {megaprokerData.megaprokers.map((megaproker) => (
            <Link 
              key={megaproker.id || `megaproker-${megaproker.slug}`} 
              to={`/megaproker/${megaproker.slug}`}
              className="group"
            >
              <div className="rounded-[15px] bg-white shadow-card overflow-hidden transition-transform hover:-translate-y-2">
                {/* Event image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={`${baseUrl}/storage/${megaproker.image}`}
                    alt={megaproker.title}
                    className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder-event.jpg';
                    }}
                  />
                </div>
                
                {/* Event content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{megaproker.title}</h3>
                  <p className="text-gray-600 line-clamp-3">{megaproker.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default Megaproker;