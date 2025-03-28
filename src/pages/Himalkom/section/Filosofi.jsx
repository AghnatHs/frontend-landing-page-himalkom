import React from "react";
import TImages from "../../../utils/images";

const Filosofi = () => {
  return(
    <div className=" p-6 flex flex-col md:flex-row md:items-start gap-8">
      {/* Logo + Teks Elevor (Kiri) */}
      <div className="flex flex-col items-center md:items-start gap-6 md:w-1/2">
        <img 
          src={TImages.LOGO.LOGO_ELEVOR}
          alt="Logo Elevor"
          className="w-45 md:w-60 lg:w-70"
        />
        <img
          src={TImages.TEXT.TEKS_ELEVOR}
          alt="Elevor"
          className="w-45 md:w-48 lg:w-65"
        />
      </div>

      {/* Explanation Cards (Kanan) */}
      <div className="flex flex-col gap-4 w-full ">
        <div className="bg-[#AFE1EA] rounded-lg p-4 shadow-md">
          <h1 className="text-lg font-bold">ELEVATE</h1>
          <p>Meninggikan Potensi, Meningkatkan Kualitas</p>
        </div>
        <div className="bg-[#AFE1EA] rounded-lg p-4 shadow-md">
          <h1 className="text-lg font-bold">INVEST</h1>
          <p>Menanam Nilai, Menuai Masa Depan</p>
        </div>
        <div className="bg-[#AFE1EA] rounded-lg p-4 shadow-md">
          <h1 className="text-lg font-bold">OPPORTUNITY</h1>
          <p>Membuka Jalan, Mewujudkan Peluang</p>
        </div>
      </div>
    </div>
  );
};

export default Filosofi;