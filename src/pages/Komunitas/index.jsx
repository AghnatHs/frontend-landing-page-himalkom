import React from 'react';
import { useParams } from "react-router-dom";


// Import custom hooks
import { useFetchData } from '../../hooks/useAPI';

// Import reuse komponen
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SectionHeader from '../../components/common/SectionHeader';
import TImages from '../../utils/images';
import MotionReveal from '@/components/common/MotionReveal';
import NotFound from '../NotFound';

// Import section
import DokumKomun from './section/dokumKomun';
import PortoKomun from './section/PortoKomun'

const Komunitas = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const { slug } = useParams();

  const { data, loading, error} = useFetchData(`communities/${slug}`, baseUrl);

  const community = data?.community

  if (loading) return <LoadingSpinner variant="page" size="large" message="Memuat data komunitas..." />;
  if (error || !community) return <NotFound/>;

  return (
    <div className="w-full">
      <MotionReveal animation="fade-up">
        {/* Hero Section */}
        <section className="font-athiti">
          <div id="hero-section" 
          className="flex flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 mt-10 sm:mt-20 md:mt-8 w-full px-4">
            {/* Logo Komunitas */}
            <img
              src={`${baseUrl}/storage/${community.logo}`}
              alt={community.name}
              className="w-28 sm:w-40 md:w-60 xl:w-85 rounded-full border-2 border-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
            />
            <div className="flex flex-col items-start text-center sm:text-left mt-4 sm:mt-0">
              {/* Nama komunitas */}
              <h1 className="font-semibold text-black md:pb-3 text-[70px] leading-24 md:text-[110px] sm:w-[300px] md:w-[363px] lg:text-[110px]">
                {community.name}
              </h1>
              {/* Garis Dekor */}
              <img
                src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
                alt="Garis Elevor"
                className="place-items-start w-[150px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-2 sm:mb-3 md:mb-4 mx-1"
              />
            </div>
          </div>
        </section>
      </MotionReveal>
      
      <MotionReveal animation="fade-up" delay={0.2}>
        {/* Description */}
        <section className="relative w-80 font-athiti md:w-120 lg:w-200 mx-auto mt-[250px] ">
          <p className="text-[16px] sm:text-[20px] md:text-[25px] text-justify leading-relaxed">{community.description}</p>
          <img
            src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
            alt="Garis Elevor"
            className="place-items-start w-[260px] md:w-[300px] lg:w-[361px] my-2 sm:mb-3 md:mb-4 mx-1"
          />
        </section>
      </MotionReveal>

      {/* Prestasi Section */}
      <MotionReveal animation="fade-up" delay={0.2}>
        <section className="px-4 flex flex-col mt-[200px]">
          <SectionHeader title="PRESTASI" altText="Garis Prestasi" />
          <div className="flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-xl lg:w-[780px] shadow-card">
              {/* Punya achievment dan di API ga "-" */}
              {community.achievements.length > 0 &&
                community.achievements.some((item) => item.value.trim() !== "-") ? (
                  <ul className="list-disc py-4 px-10 space-y-2 font-athiti lg:text-[25px]">
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
      </MotionReveal>

      {/* Dokumentasi Section */}
      <MotionReveal animation="fade-up" delay={0.2}>
        <section className="px-4 flex flex-col mt-[200px] items-center">
          <SectionHeader title="DOKUMENTASI" altText="Garis Dokumentasi" />
          <DokumKomun slides={community.images.map(img => ({
            ...img,      
            url: `${baseUrl}/storage/${img.url}`
            }))} />
        </section>
      </MotionReveal>
      
      <MotionReveal animation="fade-up" delay={0.2}>
        <section className="px-4 flex flex-col mt-[200px] items-center">
          <SectionHeader title="PORTOFOLIO KOMUNITAS" altText="Garis Dokumentasi" />
          <PortoKomun slug={slug} baseUrl={baseUrl}/>
        </section>
      </MotionReveal>

      {/* Narahubung Section */}
      <MotionReveal animation="fade-up" delay={0.1}>
        <section className="px-4 text-[24px] flex flex-col text-center  my-[200px]">
          <SectionHeader title="NARAHUBUNG" altText="Garis Narahubung" />
          <p>{community.contact}</p>
          <p>WhatsApp: {community.contact_whatsapp}</p>
          <p>@{community.instagram}</p>
        </section>
      </MotionReveal>
    </div>
  );
};

export default Komunitas;
