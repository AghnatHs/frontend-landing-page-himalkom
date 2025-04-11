import React from "react";
import ReadMoreButton from "@/components/common/ReadMore";
import { BGKanan, BGKiri } from "./BGMegprok";
import TImages from "@/utils/images"

// components/MegaprokerSection.jsx
const MegaprokerSection = ({ megaprokers, index, baseUrl }) => {
  const isEven = index % 2 === 0;

  return (
    <section className="relative w-full min-h-[500px] md:min-h-[700px] lg:min-h-[860px] overflow-hidden py-12 md:py-16 lg:py-24 mb-20 md:mb-32 lg:mb-40">
      {/* Background vektor - using SVG components */}
        <div className="absolute inset-0 w-full h-full -z-10">
          {isEven ? (
            <BGKiri 
              className="w-full h-full object-cover" 
              imageUrl={`${baseUrl}/storage/${
              megaprokers.images?.find(img => img.megaproker_id === megaprokers.id)?.url || ''
              }`} 
            />
          ) : (
            <BGKanan 
              className="w-full h-full object-cover" 
              imageUrl={`${baseUrl}/storage/${
              megaprokers.images?.find(img => img.megaproker_id === megaprokers.id)?.url || ''
              }`}
            />
          )}
        </div>

        <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-center py-25 gap-6 md:gap-8 px-4 md:px-6 max-w-7xl mx-auto h-full`}>
          {/* Logo container */}
          <div className="w-full md:w-1/2 flex items-center justify-center py-6 md:py-0">
            <img 
              src={`${baseUrl}/storage/${megaprokers.logo}`}
              alt={megaprokers.name} 
              className="w-[280px] md:w-[400px] lg:w-[450px] h-auto pb-6 rounded-2xl"
            />
          </div>

          {/* Konten */}
          <div className={`text-center ${isEven ? 'md:text-start md:place-items-start' : 'md:text-end md:place-items-end'} px-4 md:px-0`}>
            <div className="place-items-center">
              <h1 className="text-5xl lg:text-6xl font-bold mb-3 md:mb-4">{megaprokers.name}</h1>
              <img
                src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
                alt="Garis Elevor"
                className="items-center w-[200px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-2 sm:mb-3 md:mb-4 mx-1"
              />
            </div>
            <div className="py-5">
              <p className="mb-4 text-2xl">{megaprokers.description}</p>
            </div>

            <div className={`place-items-center mt-4 md:mt-6 ${isEven ? 'md:place-items-start' : 'md:place-items-end'}`}>
              <h3 className="font-semibold text-4xl pb-4">DOKUMENTASI</h3>
              {/* Tombol atau link dokumentasi */}
              <div className="bg-white w-[155px] rounded-[3px]">
                <ReadMoreButton to={megaprokers.video_url} newTab="True"/>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default MegaprokerSection;
