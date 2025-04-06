import React from "react";
import TImages from "../../../utils/images";

const Description = () => {
  return (
    <>
      <div className="flex ">
        <img
        src={TImages.LOGO.LOGO_HIMALKOM} 
        alt='Logo Himalkom'
        className="w-40 sm:w-40 md:w-48 lg:w-74 h-auto drop-shadow-[0_10px_0_rgba(175,225,234,0.8)] mt-[50px] "
        />
      </div>

      <section  className="flex-col w-80 sm:w-150 md:w-180  lg:w-213">
        <div className='pb-[50px]'>
          <h1 className="font-semibold pb-[10px] text-[48px] leading-relaxed">Apa itu HIMALKOM?</h1>
          <p className=" sm:text-base md:text-xl lg:text-2xl"> 
            Himpunan Mahasiswa Ilmu Komputer (HIMALKOM) adalah himpunan yang bergerak  
            dalam pengembangan dan eksistensi mahasiswa ilmu Komputer IPB.</p>
          <img className='pt-[20px]'
            src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          />
        </div>
      
        <div className='pt-[50px]'>
          <h1 className="font-semibold pb-[10px] text-[48px] leading-relaxed">Tujuan HIMALKOM</h1>
          <p className=" sm:text-base md:text-xl lg:text-2xl"> Mencerdaskan ilkomerz agar siap dan semangat untuk menjadi professional, memperkuat internalisasi, meningkatkan eksistensi, dan membangun Ilmu Komputer
          IPB berdasarkan aspirasi Ilkomerz sehingga tercipta hasil yang dahsyat.</p>
          <img className='pt-[20px]'
            src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          />
        </div>
      </section>

    </>
  );
};

export default Description;