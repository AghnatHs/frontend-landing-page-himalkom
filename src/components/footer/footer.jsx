import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

const Section = () => {
  return (
    <>
      {/* Bagian atas garis */}
      <div className="bg-gray-50 flex flex-col md:flex-row font-athiti text-lg md:text-xl justify-between px-4 md:px-12 py-8 md:py-8">
        <div className="mb-4 md:mb-0">
          <p> Jl. Meranti Wing 20 Kampus IPB, <br />
          Babakan, Kec. Dramaga, Kabupaten Bogor, <br /> 
          Jawa Barat 16680
          </p>
        </div>

        <div>
          <p>Email: <a href="mailto:himalkom@apps.ipb.ac.id" className="hover:text-blue-400 hover:underline">himalkom@apps.ipb.ac.id</a> <br />
          Phone: <a href="https://wa.me/6285155391409" className="hover:text-blue-400 hover:underline">+62 851-5539-1409</a> </p>
        </div>
      </div>

      {/* Garis */}
      <div className="border-t border-gray-300 w-full"></div>

      {/* Bagian bawah garis */}  
      <div className="relative flex md:flex-row gap-2 items-center px-4 md:px-12 flex-col py-4 w-full">
        
        {/* Ikon Sosial Media */}
        <div className="flex gap-4 md:justify-end justify-center items-center w-full z-10">
          <a href="https://www.facebook.com/himalkom/?locale=id_ID" className="hover:text-blue-900 transition-colors p-2">
            <FaFacebook size={20} />
          </a>
          <a href="https://www.instagram.com/himalkomipb/" className="hover:text-pink-400 transition-colors p-2">
            <FaInstagram size={20} />
          </a>
          <a href="https://twitter.com/HimalkomIPB" className="hover:text-purple-950 transition-colors p-2">
            <FaXTwitter size={20} />
          </a>
          <a href="https://www.youtube.com/@himalkomipb4653" className="hover:text-red-500 transition-colors p-2">
            <FaYoutube size={20} />
          </a>
        </div>

        {/* Copyright*/}
        <div className="text-center w-full md:absolute md:w-auto">
          <p className="font-athiti font-bold text-sm md:text-center">
            Copyright © Himalkom 2025. All rights reserved. 
          </p>
        </div>
        
      </div>
    </>
  )
}

export default Section;