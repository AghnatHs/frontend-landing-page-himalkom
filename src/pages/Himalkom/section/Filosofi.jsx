import React from "react";
import TImages from "../../../utils/images";
import MotionReveal from '@/components/common/MotionReveal';

const Filosofi = () => {
  return(
    <div className="px-10 py-10 flex flex-col md:flex-row lg:px-30 items-center md:items-start gap-8">
      {/* Logo + Teks Elevor (Kiri) */}
      <MotionReveal animation="fade-left" delay={0.3}>
        <div className="flex flex-col items-center md:items-start gap-6 w-full">
          <img 
            src={TImages.LOGO.LOGO_ELEVOR}
            alt="Logo Elevor"
            className="w-50 md:w-66 lg:w-90"
          />
          <img
            src={TImages.TEXT.TEKS_ELEVOR}
            alt="Elevor"
            className="w-47 md:w-64 lg:w-85"
          />
        </div>
      </MotionReveal>

      {/* Explanation Cards (Kanan) */}
      <div className="relative w-full py-15 items-center flex flex-col gap-6 md:items-end lg:items-end">
        <MotionReveal animation="fade-right">
          <div className="bg-[#AFE1EA] rounded-lg p-4 text-center shadow-md w-[330px] lg:text-start xl:w-[505px] lg:w-[400px]">
            <h1 className="text-lg font-bold">ELEVATE</h1>
            <p>Meninggikan Potensi, Meningkatkan Kualitas</p>
          </div>
        </MotionReveal>
       <MotionReveal animation="fade-right" delay={0.3}>
        <div className="bg-[#AFE1EA] rounded-lg p-4 text-center shadow-md w-[330px] xl:w-[705px] lg:text-start lg:w-[400px]">
            <h1 className="text-lg font-bold">INVEST</h1>
            <p>Menanam Nilai, Menuai Masa Depan</p>
          </div>
       </MotionReveal>
        <MotionReveal animation="fade-right" delay={0.5}>
          <div className="bg-[#AFE1EA] rounded-lg p-4 text-center shadow-md w-[330px] lg:text-start xl:w-[505px] lg:w-[400px]">
            <h1 className="text-lg font-bold">OPPORTUNITY</h1>
            <p>Membuka Jalan, Mewujudkan Peluang</p>
          </div>
        </MotionReveal>
      </div>
    </div>


  );
};

export default Filosofi;