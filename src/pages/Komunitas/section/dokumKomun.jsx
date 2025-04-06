import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import React, { useState } from "react";

const DokumKomun = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!slides || slides.length === 0) {
    return <p className="text-center text-gray-500">Belum ada dokumentasi tersedia.</p>;
  }

  const slideStyles = {
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex]?.url})`,
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const visibleThumbs = [
    (currentIndex + 1) % slides.length,
    (currentIndex + 2) % slides.length,
    (currentIndex + 3) % slides.length,
  ];

  return (
    <div className="flex flex-col w-[380px] sm:w-[600px] md:w-[700px] items-center overflow-hidden bg-white shadow-card rounded-xl lg:w-[848px] ">

      {/* Banner */}
      <div className="gap-1 md:gap-2 flex items-center lg:gap-4 py-6">
        {/* Panah kiri */}
        <FaAngleLeft onClick={goToPrevious} className="cursor-pointer text-gray-600 hover:text-black transition" size={30} />
        {/* Gambar tengah */}
        <div className="w-[300px] h-[200px] sm:w-[450px] sm:h-[280px] md:w-[600px] md:h-[310px] lg:w-[700px] lg:h-[350px] border-2 border-gray-300 rounded-lg shadow-lg bg-cover bg-center" style={slideStyles}></div>
        {/* Panah kanan */}
        <FaAngleRight onClick={goToNext} className="cursor-pointer text-gray-600 hover:text-black transition" size={30} />
      </div>

      {/* Thumbnail Section */}
      <div className="flex overflow-x-auto overflow-hidden gap-2 sm:gap-3 lg:py-4 lg:gap-4">
        {visibleThumbs.slice(0,3).map((slideIndex) => (
          <div
            key={slideIndex}
            className="border-2 mb-2 w-[110px] sm:w-[150px] sm:h-[100px] md:w-[200px] border-gray-300 rounded-lg lg:w-[220px] lg:h-[140px] overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
          >
            <img
              src={slides[slideIndex]?.url}
              alt={`Slide ${slideIndex + 1}`}
              className="w-full h-full object-cover rounded-lg"
              onClick={() => setCurrentIndex(slideIndex)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DokumKomun;
