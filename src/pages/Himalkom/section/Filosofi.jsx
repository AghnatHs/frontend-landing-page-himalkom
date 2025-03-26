import React from "react";
import TImages from "../../../utils/images";

const Filosofi = () => {
  return(
    <div className="flex flex-row md:w-[357px] py-[61px] ">
      <div className="flex flex-col gap-[32px]">
        <img 
          src={TImages.LOGO.LOGO_ELEVOR}
          alt="Logo Elevor"
        />
        <img
          src={TImages.LOGO.NAMA_ELEVOR}
          alt="Elevor"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-[#AFE1EA] rounded-[10px] h-[111px] w-[300px]">
          <h1 className="text-2xl font-bold">ELEVATE</h1>
          <p>Meninggikan Potensi, Meningkatkan Kualitas</p>
        </div>
        <div className="bg-[#AFE1EA] rounded-[10px] h-[111px] w-[300px]">
          <h1 className="text-2xl font-bold">INVEST</h1>
          <p>Menanam Nilai, Menuai Masa Depan</p>
        </div>
        <div className="bg-[#AFE1EA] rounded-[10px] h-[111px] w-[300px]">
          <h1 className="text-2xl font-bold">OPPORTUNITY</h1>
          <p>Membuka Jalan, Mewujudkan Peluang</p>
        </div>
      </div>
    </div>
  );
};

export default Filosofi;