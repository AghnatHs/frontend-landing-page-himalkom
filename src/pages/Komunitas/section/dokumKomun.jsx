import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, {useState} from 'react';


const dokumKomun = ({slides}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleThumbs = [
    currentIndex,
    (currentIndex + 1) % slides.length,
    (currentIndex + 2) % slides.length,
    (currentIndex + 3) % slides.length
  ];

  const slideStyles = {   
      backgroundPosition: 'center',
      backgroundSize: "cover",
      backgroundImage: `url(${slides[currentIndex].url})`,
     
  };

  const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
  };

  const goToNext = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
  };

  // const goToSlide = (index) => {
  //     setCurrentIndex(index);
  // }

  const getThumbnailIndex = (index) => {
      if (currentIndex + index < slides.length) {
          return currentIndex + index;
      } else {
          return currentIndex + index - slides.length;
      }
  };

  return (
    <div>
      {/* Box Dokumentasi */}
      <div className="mt-[80px] flex flex-col justify-center items-center overflow-hidden ">
        {/* Bagian atas */}
        <div className="head">
          {/* Panah kiri */}
          <ChevronLeft onClick={goToPrevious}/>
          {/* Gambar tengah */}
          <div className='image-preview w-[696px] h-[342px] border-[3px] border-solid inset-shadow-2xs' style={slideStyles}></div>
          {/* Panah kanan */}
          <ChevronRight onClick={goToNext}/>
        </div>
        {/* Bagian bawah */}
        <div className="flex bg-black justify-center py-[54px] gap-[20px]">
        {visibleThumbs.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="border-solid rounded-xl border-2 w-[215px] h-[136px] m-[5px] duration-300 ease-in-out"
              >
                <img
                  src={slides[getThumbnailIndex(slideIndex)].url}
                  alt={`Slide ${slideIndex + 1}`}
                  className="cursor-pointer object-cover"
                  onClick={() => setCurrentIndex(getThumbnailIndex(slideIndex))}
                  onMouseEnter={(event) => {
                    event.target.parentNode.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(event) => {
                    event.target.parentNode.style.transform = "scale(1)";
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default dokumKomun;