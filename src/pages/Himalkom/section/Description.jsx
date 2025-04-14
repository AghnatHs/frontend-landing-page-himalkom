import React from "react";
import TImages from "@/utils/images";
import MotionReveal from '@/components/common/MotionReveal';

const Description = () => {
  return (
    <div className="relative flex flex-row items-center lg:items-center">
      <div className="absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none z-0">
        <img
          src={TImages.LOGO.LOGO_HIMALKOM} 
          alt='Logo Himalkom'
          className="w-[400px] lg:w-[440px] h-auto"
        />
      </div>


      <div className="flex-col w-80 sm:w-150 md:w-180 lg:w-240 z-10">
        <MotionReveal animation="fade-up" delay={0.2}>
          <div className='pb-[50px]'>
            <h1 className="font-semibold pb-[10px] text-[35px] lg:text-[48px] leading-relaxed">Apa itu HIMALKOM?</h1>
            <p className="text-justify text-[17px] md:text-xl lg:text-2xl"> 
              Himpunan Mahasiswa Ilmu Komputer (HIMALKOM) adalah himpunan yang bergerak  
              dalam pengembangan dan eksistensi mahasiswa ilmu Komputer IPB.</p>
            <img className='pt-[20px] w-[250px] lg:w-auto'
              src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
            />
          </div>
        </MotionReveal>
      
        <MotionReveal animation="fade-up" delay={0.2}>
          <div className='pt-[50px]'>
            <h1 className="font-semibold pb-[10px] text-[35px] lg:text-[48px] leading-relaxed">Tujuan HIMALKOM</h1>
            <p className="text-justify text-[17px] md:text-xl lg:text-2xl"> Mencerdaskan ilkomerz agar siap dan semangat untuk menjadi professional, memperkuat internalisasi, meningkatkan eksistensi, dan membangun Ilmu Komputer
            IPB berdasarkan aspirasi Ilkomerz sehingga tercipta hasil yang dahsyat.</p>
            <img className='pt-[20px] w-[250px] lg:w-auto'
              src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
            />
          </div>
        </MotionReveal>
      </div>
    </div>
  );
};

export default Description;