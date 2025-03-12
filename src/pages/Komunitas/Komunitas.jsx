import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

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
  const [community, setCommunity] = useState(null)

  const { data: communitiesData, loading: loadingCommunities, error: errorCommunities } = useFetchData('slug', baseUrl);

  useEffect(() => {
    if (communitiesData && communitiesData.communities) {
      const foundCommunity = communitiesData.communities.find(c => c.slug === slug);
      setCommunity(foundCommunity);
    }
  }, [communitiesData, slug]);

  if (loadingCommunities) return <p className="text-center">Loading communities...</p>;
  if (errorCommunities) return <p className="text-red-500 font-bold text-xl text-center">Error: {errorCommunities}</p>;
  if (!community) return null;

  return (
    <>
      <section className="font-athiti">
      <div
        id="hero-section"
        className="flex justify-center gap-24 items-center mt-50 w-full px-4">
        <img
          src={community.logo}
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
          <div className="flex flex-col text-black text-2xl font-normal">
            {community.desc}
          </div>
        </div>
      </div>
      </section>

      <section className="relative font-athiti max-w-4xl mx-auto my-[20rem] text-[1.5rem] leading-relaxed">
        <p>
         {community.desc}
        </p>
        <img
          src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          alt="Garis Elevor"
          className="w-[361px] my-4"
        />
      </section>

      <section  className="px-4 flex flex-col mt-[250px]">
        <SectionHeader title="PRESTASI" altText="Garis Prestasi" />
        <div className="flex justify-center items-center ">
            <div className="bg-white shadow-lg rounded-xl  w-[768px] border border-purple-100">
              <ul className="list-disc pl-8 space-y-2 font-athiti text-[22px]">
              {community.achievement.map((item, index) => (
              <li key={index}>{item}</li>
              ))}
              </ul>
            </div>
          </div>
      </section>

      <section className="px-4 flex flex-col mt-[200px]">
        <SectionHeader title="DOKUMENTASI" altText="Garis Prestasi" />
        <DokumKomun slides={community.image}/>
      </section>

      <section className="px-4 flex flex-col my-[200px]">
        <SectionHeader title="NARAHUBUNG" altText="Garis Prestasi" />
        <p>{community.contact}</p>
        <p>whatsApp: {community.whatsapp}</p>
        <p>@{community.instagram}</p>
      </section>
      
    </>

  )

} 

export default Komunitas;