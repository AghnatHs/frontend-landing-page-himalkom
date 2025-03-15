import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="flex flex-col items-center overflow-hidden bg-white shadow-lg rounded-xl w-[848px] border border-purple-100">

      {/* Banner */}
      <div className="flex items-center gap-4 py-6">
        {/* Panah kiri */}
        <ChevronLeft onClick={goToPrevious} className="cursor-pointer text-gray-600 hover:text-black transition" />
        {/* Gambar tengah */}
        <div className="w-[700px] h-[350px] border-2 border-gray-300 rounded-lg shadow-lg bg-cover bg-center" style={slideStyles}></div>
        {/* Panah kanan */}
        <ChevronRight onClick={goToNext} className="cursor-pointer text-gray-600 hover:text-black transition" />
      </div>

      {/* Thumbnail Section */}
      <div className="flex overflow-x-auto overflow-hidden py-6 gap-4">
        {visibleThumbs.slice(0,3).map((slideIndex) => (
          <div
            key={slideIndex}
            className="border-2 border-gray-300 rounded-lg w-[220px] h-[140px] overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
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
