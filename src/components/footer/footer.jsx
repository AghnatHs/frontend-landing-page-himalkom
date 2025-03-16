import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";



const Section = () => {
  return (
    <>
      {/* Bagian atas garis */}
      <div className="flex flex-col md:flex-row font-athiti text-xl justify-between px-[45px] py-[60px]">
        <div>
          <p> Jl. Meranti Wing 20 Kampus IPB, <br />
          Babakan, Kec. Dramaga, Kabupaten Bogor, <br /> 
          Jawa Barat 16680
          </p>
        </div>

        <div>
          <p>Email:<a href="mailto:himalkom@apps.ipb.ac.id" className="hover:text-blue-400 hover:underline"> himalkom@apps.ipb.ac.id </a> <br />
          Phone: <a href="wa.me/6285155391409" className="hover:text-blue-400 hover:underline">+62 851-5539-1409</a> </p>
        </div>
      </div>

      {/* Garis */}
      <div className="border-[1.5px] border-solid h-[1px] w-full"></div>

      {/* Bagian bawah garis */}
      <div className="relative flex items-center px-12  justify-center h-[65px]">
        {/* Copyright di Tengah */}
        <p className="font-athiti font-bold text-[14px] absolute left-1/2 transform -translate-x-1/2">
          Copyright © Himalkom 2025. All rights reserved. 
        </p>

        {/* Ikon Sosial Media */}
        <div className="absolute right-[6rem] flex space-x-7">
          <a href="https://www.facebook.com/himalkom/?locale=id_ID" className="hover:text-blue-900">
            <FaFacebook size={20} />
          </a>
          <a href="https://www.instagram.com/himalkomipb/" className="hover:text-pink-400">
            <FaInstagram size={20} />
          </a>
          <a href="https://twitter.com/HimalkomIPB" className="hover:text-purple-950">
            <FaXTwitter size={20} />
          </a>
          <a href="https://www.youtube.com/@himalkomipb4653" className="hover:text-red-500">
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </>
  )
}

export default Section;