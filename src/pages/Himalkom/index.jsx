import React from 'react';
import HeroSection from '../Home/sections/HeroSection';
import DescSection from './section/SectionHeader';
import { useFetchData } from '../../hooks/useAPI';
import Division from './section/Division';

const Himalkom = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const { data: divisionData, loading: divisionLoading, error: divisionError } = useFetchData('divisions', baseUrl);


  return (
   <>
    <HeroSection />

    <section  className="px-4 flex flex-col ml-[123px] mt-[400px]">
      <DescSection title="Apa Itu Himalkom?" altText="Garis Prestasi" width="w-[361px]"/>
      <p className="text-[24px]"> Himpunan Mahasiswa Ilmu Komputer (HIMALKOM) adalah himpunan yang bergerak<br/> 
       dalam pengembangan dan eksistensi mahasiswa ilmu Komputer IPB.</p>
    </section>

    <section  className="px-4 flex flex-col ml-[123px] mt-[170px] ">
      <DescSection title="Tujuan Himalkom" altText="Garis Prestasi"  width="w-[361px]"/>
      <p className="text-[24px] "> Mencerdaskan ilkomerz agar siap dan semangat untuk menjadi professional, <br/>
      memperkuat internalisasi, meningkatkan eksistensi, dan membangun Ilmu Komputer <br/>
      IPB berdasarkan aspirasi Ilkomerz sehingga tercipta hasil yang dahsyat.</p>
    </section>

    <section className="px-4 flex flex-col items-center text-center mt-[400px]">
      <DescSection className="items-center" title="FILOSOFI LOGO" altText="Garis Prestasi" />
      <HeroSection />
    </section>

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
