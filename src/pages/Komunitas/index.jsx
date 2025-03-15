import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

// Import custom hooks
import { useFetchData } from '../../hooks/useAPI';

// Import reuse komponen
import SectionHeader from '../../components/common/SectionHeader';
import TImages from '../../utils/images';

// Import section
import DokumKomun from './section/dokumKomun';

const Komunitas = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const { slug } = useParams();

  const { data, loading, error} = useFetchData(`communities/${slug}`, baseUrl);

  const community = data?.community

  if (loading) return <p className="text-center">Loading communities...</p>;
  if (error) return <p className="text-red-500 font-bold text-xl text-center">Error: {error}</p>;
  if (!community) return null;

  return (
    <>

      {/* Hero Section */}
      <section className="font-athiti">
        <div id="hero-section" className="flex justify-center gap-24 items-center mt-50 w-full px-4">
          <img
            src={`${baseUrl}/storage/${community.logo}`}
            alt={community.name}
            className="w-70"
          />
          <div className="flex flex-col text-left">
            <h1 className="font-semibold text-black pb-5 text-[110px] leading-24 sm:text-[90px] md:text-[110px] sm:w-[300px] md:w-[363px]">
              {community.name}
            </h1>
            <img
              src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
              alt="Garis Elevor"
              className="w-[361px] mb-4"
            />
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="relative font-athiti max-w-4xl mx-auto my-[20rem] text-[1.5rem] leading-relaxed">
        <p>{community.description}</p>
        <img
          src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          alt="Garis Elevor"
          className="w-[361px] my-4"
        />
      </section>

      {/* Prestasi Section */}
      <section className="px-4 flex flex-col mt-[250px]">
        <SectionHeader title="PRESTASI" altText="Garis Prestasi" />
        <div className="flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-xl w-[768px] border border-purple-100">
            {community.achievements.length > 0 &&
              community.achievements.some((item) => item.value.trim() !== "-") ? (
                <ul className="list-disc py-4 px-10 space-y-2 font-athiti text-[22px]">
                  {community.achievements
                    .filter((item) => item.value.trim() !== "-") 
                    .map((item, index) => (
                      <li key={index}>{item.value}</li>
                    ))}
                </ul>
              ) : (
                <p className="py-6 px-10 text-center text-gray-500 font-athiti text-[22px]">Coming Soon</p>
            )}
          </div>
        </div>
      </section>

      {/* Dokumentasi Section */}
      <section className="px-4 flex flex-col mt-[200px] items-center">
        <SectionHeader title="DOKUMENTASI" altText="Garis Dokumentasi" />
        <DokumKomun slides={community.images.map(img => ({
          ...img,      
          url: `${baseUrl}/storage/${img.url}`
           }))} />
      </section>

      {/* Narahubung Section */}
      <section className="px-4 flex flex-col text-center text-2xl my-[200px]">
        <SectionHeader title="NARAHUBUNG" altText="Garis Narahubung" />
        <p>{community.contact}</p>
        <p>WhatsApp: {community.contact_whatsapp}</p>
        <p>@{community.instagram}</p>
      </section>
    </>
  );
};

export default Komunitas;
