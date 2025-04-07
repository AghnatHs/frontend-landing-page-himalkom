import React from "react";
import ReadMoreButton from "@/components/common/ReadMore";
import { BGKanan, BGKiri } from "./BGMegprok";

// components/MegaprokerSection.jsx
const MegaprokerSection = ({ megaprokers, index, baseUrl }) => {
  const isEven = index % 2 === 0;

  return (
    <section className="relative w-full h-[860px] overflow-hidden py-24 mb-40">
      {/* Background vektor - using SVG components */}
      <div className="absolute inset-0 w-full h-full -z-10">
        {isEven ? (
          <BGKiri className="w-full h-full object-cover" imageUrl={`${baseUrl}/storage/${megaprokers.logo}`} />
        ) : (
          <BGKanan className="w-full h-full object-cover" imageUrl={`${baseUrl}/storage/${megaprokers.logo}`}/>
        )}
      </div>


      <div className={`flex flex-row ${isEven ? 'lg:flex-row-reverse' : ''} items-center justify-between gap-8 px-6 max-w-7xl mx-auto h-full`}>
        {/* Logo container */}
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={`${baseUrl}/storage/${megaprokers.logo}`}
            alt={megaprokers.name} 
            className="w-[450px] h-auto rounded-2xl"
          />
        </div>

        {/* Konten */}
        <div className="max-w-lg text-center lg:text-start">
          <h2 className="text-3xl font-bold mb-4">{megaprokers.name}</h2>
          <p className="mb-4">{megaprokers.description}</p>

          <div className="mt-6 ">
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
