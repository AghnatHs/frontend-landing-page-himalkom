import React from 'react';

import TImages from '../../utils/images';

// Import sections untuk halaman 
import HeroSection from '../Home/sections/HeroSection';
import Filosofi from './section/Filosofi';
import Division from './section/Division';
import Description from './section/Description';

// Import custom hooks
import { useFetchData } from '../../hooks/useAPI';

const Himalkom = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Data API
  const { data: divisionData, loading: divisionLoading, error: divisionError } = useFetchData('divisions', baseUrl);

  return (
   <>
   {/* Hero Section */}
    <HeroSection />

    {/* Desc Section */}
    <section className="flex flex-col items-center mt-[280px] sm:items-center md:items-center md:flex-col gap-11 lg:flex-row justify-around h-auto">
      <Description />
    </section>

    {/* Filosofi Section */}
    <section className="px-4 flex flex-col text-center mt-[200px]">
      <div className='flex flex-col items-center mb-[1px] '>
        {/* Judul */}
        <h1 className="font-semibold pb-[10px] text-[48px] leading-11">FILOSOFI LOGO</h1>
        {/* Garis */}
        <img
          src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          alt="Garis Prestasi"
        />
      </div>
      <p className="text-2xl my-[30px]"><b>Elevor</b> bukan sekadar nama kabinet, tetapi sebuah gerakan yang membawa perubahan nyata dalam Himalkom.</p>
      <Filosofi />
    </section>

    {/* Departemen Section */}
    <section className="px-4 flex flex-col items-center text-center my-[200px]">
      <div className='flex flex-col items-center mb-[1px] '>
        {/* Judul */}
        <h1 className="font-semibold pb-[10px] text-[48px] leading-11">DEPARTEMEN HIMALKOM</h1>
        {/* Garis */}
        <img
          src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          alt="Garis Prestasi"
        />
      </div>
      <Division 
      divisionData={divisionData}
      divisionError={divisionError}
      divisionLoading={divisionLoading}
      baseUrl={baseUrl}/>
    </section>
   </>
  );
};

export default Himalkom;
