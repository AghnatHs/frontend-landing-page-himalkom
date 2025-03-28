import React from 'react';

// Import sections untuk halaman 
import HeroSection from '../Home/sections/HeroSection';
import DescSection from './section/SectionHeader';
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
    <section className="flex flex-col sm:items-center md:items-center md:flex-col gap-11 lg:flex-row mt-[400px] justify-around h-auto">
      <Description />
    </section>

    {/* Filosofi Section */}
    <section className="px-4 flex flex-col items-center text-center justify-around mt-[300px]">
      <DescSection className="items-center" title="FILOSOFI LOGO" altText="Garis Prestasi" />
      <p className="text-2xl mt-[80px]"><b>Elevor</b> bukan sekadar nama kabinet, tetapi sebuah gerakan yang membawa perubahan nyata dalam Himalkom.</p>
      <Filosofi />
    </section>

    {/* Departemen Section */}
    <section className="px-4 flex flex-col items-center text-center my-[300px]">
      <DescSection className="items-center" title="DEPARTEMEN HIMALKOM" altText="Garis Prestasi" />
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
