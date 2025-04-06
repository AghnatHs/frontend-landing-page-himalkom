import React from "react";
import TImages from "@/utils/images";
import ReadMoreButton from "@/components/common/ReadMore";

// components/MegaprokerSection.jsx
const MegaprokerSection = ({ megaprokers, index, baseUrl }) => {
  const isEven = index % 2 === 0;

  return (
    <section className="relative w-full overflow-hidden ">
      {/* Background vektor - use different background based on even/odd */}
      <img
        src={isEven ? TImages.BACKGROUNDS.MEGPROK_KIRI : TImages.BACKGROUNDS.MEGPROK_KANAN}
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />

      <div className={`flex flex-col lg:flex-row ${isEven ? 'lg:flex-row-reverse' : ''} items-center justify-between gap-8 px-6 py-16`}>
        {/* Logo container - updated to match image style */}
        <div className="flex-shrink-0 w-60 h-60 flex items-center justify-center">
          <img 
            src={`${baseUrl}/storage/${megaprokers.logo}`}
            alt={megaprokers.name} 
            className="w-full shadow-card object-contain"
          />
        </div>

        {/* Konten */}
        <div className="max-w-lg text-center lg:text-start">
          <h2 className="text-3xl font-bold mb-4">{megaprokers.name}</h2>
          <p className="mb-4">{megaprokers.description}</p>

          <div className="mt-6">
            <h3 className="font-semibold">DOKUMENTASI</h3>
            {/* Tombol atau link dokumentasi */}
            <div className="bg-white">
              <ReadMoreButton to={megaprokers.video_url} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MegaprokerSection;
