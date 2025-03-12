import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Section berita (KOMnews)
 */
const Komnews = ({ newsData, loadingNews, errorNews, currentNewsIndex, goToNewsSlide, baseUrl }) => {
  if (loadingNews) return <p className="text-center">Loading news...</p>;
  if (errorNews) return <p className="text-red-500 font-bold text-xl text-center">Error: {errorNews}</p>;
  if (!newsData || !newsData.komnews) return null;

  return (
    <div className="relative mx-auto max-w-6xl">
      <div className="w-full">
        {newsData.komnews.map((komnews, index) => (
          <div
            key={komnews.id || index}
            className={`w-full h-[350px] rounded-[15px] bg-white shadow-[0px_0px_8px_0.3px_rgba(105,83,207,0.39)] flex transition-opacity duration-500 ${
              index === currentNewsIndex ? 'opacity-100' : 'hidden opacity-0'
            }`}
          >
            {/* Bagian konten - separuh kiri */}
            <div className="w-1/2 p-8 flex flex-col h-full">
              {/* Wrapper untuk judul dan konten dengan overflow */}
              <div className="flex-grow overflow-hidden flex flex-col">
                <h3 className="font-bold text-2xl mb-4">{komnews.title}</h3>
                
                {/* Content dengan ellipsis yang dinamis berdasarkan ukuran layar */}
                <div 
                  className="text-gray-700 overflow-hidden flex-grow"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: "6", // Mengurangi jumlah baris untuk layar kecil
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis"
                  }}
                  dangerouslySetInnerHTML={{ __html: komnews.content }}
                ></div>
              </div>
              
              {/* Tombol dengan margin top tetap */}
              <div className="mt-4">
                <Link 
                  to={`/komnews/${komnews.slug || komnews.id}`} 
                  className='inline-block px-4 py-2 text-sm rounded-sm bg-white shadow-[0px_0px_8px_0.3px_rgba(105,83,207,0.39)] cursor-pointer transition-all hover:shadow-[0px_0px_8px_2px_rgba(105,83,207,0.39)]'
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </div>
            
            {/* Bagian gambar - separuh kanan */}
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
            onClick={() => goToNewsSlide(index)}
            className={`mx-2 w-3 h-3 rounded-full ${
              index === currentNewsIndex ? 'bg-purple-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Komnews;