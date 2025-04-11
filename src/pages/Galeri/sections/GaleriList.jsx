import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt, FaUserFriends, FaGraduationCap } from "react-icons/fa";
import ReadMoreButton from "@/components/common/ReadMore";

/**
 * Gallery Card Component with enhanced design
 */
const GalleryCard = ({ gallery, baseUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col">
      {/* Image dengan link */}
      <Link to={`/galeri/${gallery.id}`}>
        <div className="w-full h-[220px] overflow-hidden relative group">
          <img 
            src={`${baseUrl}/storage/${gallery.image}`}
            alt={gallery.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder-news.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 w-full text-white">
              <h3 className="font-bold text-lg">{gallery.name}</h3>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Info strip */}
        <div className="flex justify-between items-center mb-3">
          <span className="inline-block bg-primary-light text-primary-dark text-xs px-3 py-1 rounded-full">
            {gallery.subjectName || gallery.subject?.name}
          </span>
          <div className="flex items-center text-xs text-gray-500">
            <FaGraduationCap className="mr-1" />
            <span>Angkatan {gallery.angkatan}</span>
          </div>
        </div>
        
        {/* Title */}
        <Link to={`/galeri/${gallery.id}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors">{gallery.name}</h3>
        </Link>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
          {gallery.description}
        </p>
        
        {/* Contributors */}
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <FaUserFriends className="mr-2" size={14} />
          <span className="font-medium mr-1">Kontributor:</span> {gallery.contributor}
        </div>
        
        {/* Actions */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
          {/* Ganti link dengan ReadMoreButton */}
          <ReadMoreButton to={`/galeri/${gallery.id}`} />
          
          {gallery.link && (
            <a 
              href={gallery.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-primary-dark hover:text-primary transition"
            >
              {gallery.link.includes('github.com') ? (
                <>
                  <FaGithub size={16} />
                  <span>GitHub</span>
                </>
              ) : (
                <>
                  <FaExternalLinkAlt size={14} />
                  <span>Website</span>
                </>
              )}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Gallery Grid Component
 */
const GalleryGrid = ({ galleries, baseUrl }) => {
  if (!galleries || galleries.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Tidak ada proyek yang tersedia untuk kategori ini.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {galleries.map((gallery, index) => (
        <GalleryCard 
          key={`gallery-${gallery.id || index}`}
          gallery={gallery}
          baseUrl={baseUrl}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;