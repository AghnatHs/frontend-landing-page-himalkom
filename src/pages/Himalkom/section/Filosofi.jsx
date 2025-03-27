import React from "react";
import TImages from "../../../utils/images";

const Filosofi = () => {
  return(
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row items-center gap-8">
      <div className="flex flex-col items-center md:items-start gap-6">
        {/* Logo Section */}
        <img 
          src={TImages.LOGO.LOGO_ELEVOR}
          alt="Logo Elevor"
          className="w-40 md:w-60"
        />
        {/* Teks ELevor */}
        <img
          src={TImages.TEXT.TEKS_ELEVOR}
          alt="Elevor"
          className="w-32 md:w-48"
        />
      </div>
      
      {/* Explanation Cards */}
      <div className="flex flex-col gap-4 w-full md:w-auto">
        <div className="bg-[#AFE1EA] rounded-lg p-4 w-full md:w-[500px] shadow-md">
          <h1 className="text-lg font-bold">ELEVATE</h1>
          <p className="">Meninggikan Potensi, Meningkatkan Kualitas</p>
        </div>
        <div className="bg-[#AFE1EA] rounded-lg p-4 w-full md:w-[500px] shadow-md">
          <h1 className="text-lg font-bold">INVEST</h1>
          <p className="">Menanam Nilai, Menuai Masa Depan</p>
        </div>
        <div className="bg-[#AFE1EA] rounded-lg p-4 w-full md:w-[500px] shadow-md">
          <h1 className="text-lg font-bold">OPPORTUNITY</h1>
          <p className="">Membuka Jalan, Mewujudkan Peluang</p>
        </div>
      </div>
    </div>
  );
};

export default Filosofi;