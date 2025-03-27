import React from "react";
import TImages from "../../../utils/images";

const Description = () => {
  return (
    <>
      <div>
        <img
        className="w-[297px] h-auto drop-shadow-[0_10px_0_rgba(175,225,234,0.8)] mt-[50px] "
        src={TImages.LOGO.LOGO_HIMALKOM} 
        alt='Logo Himalkom'
        />
      </div>

      <section  className="flex-col">
        <div className='pb-[50px]'>
          <h1 className="font-semibold pb-[10px] text-[48px] leading-11">Apa itu HIMALKOM?</h1>
          <p className="text-[24px]"> Himpunan Mahasiswa Ilmu Komputer (HIMALKOM) adalah himpunan yang bergerak<br/> 
          dalam pengembangan dan eksistensi mahasiswa ilmu Komputer IPB.</p>
          <img className='pt-[20px]'
            src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          />
        </div>
      
        <div className='pt-[50px]'>
          <h1 className="font-semibold pb-[10px] text-[48px] leading-11">Tujuan HIMALKOM</h1>
          <p className="text-[24px] "> Mencerdaskan ilkomerz agar siap dan semangat untuk menjadi professional, <br/>
          memperkuat internalisasi, meningkatkan eksistensi, dan membangun Ilmu Komputer <br/>
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