import React from "react";
import TImages from "../../../utils/images";

const Description = () => {
  return (
    <>
      {/* Logo kanan */}
      <div className="flex ">
        <img
        src={TImages.LOGO.LOGO_HIMALKOM} 
        alt='Logo Himalkom'
        className="w-45 sm:w-45 md:w-50 lg:w-85 h-auto drop-shadow-[0_10px_5px_rgba(175,225,234,0.8)] "
        />
      </div>

      <div className="flex-col w-80 sm:w-150 md:w-180 lg:w-213">
        <div className='pb-[50px]'>
          <h1 className="font-semibold pb-[10px] text-[35px] lg:text-[48px] leading-relaxed">Apa itu HIMALKOM?</h1>
          <p className="text-justify text-[17px] md:text-xl lg:text-2xl"> 
            Himpunan Mahasiswa Ilmu Komputer (HIMALKOM) adalah himpunan yang bergerak  
            dalam pengembangan dan eksistensi mahasiswa ilmu Komputer IPB.</p>
          <img className='pt-[20px] w-[250px] lg:w-auto'
            src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          />
        </div>
      
        <div className='pt-[50px]'>
          <h1 className="font-semibold pb-[10px] text-[35px] lg:text-[48px] leading-relaxed">Tujuan HIMALKOM</h1>
          <p className="text-justify text-[17px] md:text-xl lg:text-2xl"> Mencerdaskan ilkomerz agar siap dan semangat untuk menjadi professional, memperkuat internalisasi, meningkatkan eksistensi, dan membangun Ilmu Komputer
          IPB berdasarkan aspirasi Ilkomerz sehingga tercipta hasil yang dahsyat.</p>
          <img className='pt-[20px] w-[250px] lg:w-auto'
            src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          />
        </div>
      </div>

    </>
  );
};

export default Description;