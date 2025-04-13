import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import TImages from '../utils/images';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const [hideBottomPattern, setHideBottomPattern] = useState(false);

  useEffect(() => {
    const heroPatternHeight = document.querySelector('.hero-pattern')?.offsetHeight || 0;
    const fullHeight = document.documentElement.scrollHeight;

    // Hide bottom pattern if hero pattern height is too large
    setHideBottomPattern(heroPatternHeight >= fullHeight * 0.7);
  }, [location]);

  // Jika pathname adalah "/megaproker", maka tidak tampilkan bottom pattern
  const isMegaproker = location.pathname === "/megaproker";

  return (
    <div className="relative min-h-screen flex-1 md:pt-14 lg:pt-20 overflow-x-hidden"> 

      <div className="absolute inset-0 w-full h-full -z-10 bg-primary-light/30"> 
        <img
          src={TImages.BACKGROUNDS.HERO_PATTERN}
          alt="Hero Background"
          className="hero-pattern absolute w-full object-cover -top-2 h-96 sm:h-[500px] md:h-[600px] lg:h-[780px] xl:h-[920px]"
        />
      </div>
      
      <div className="relative overflow-hidden">
        {children}
      </div>

      {!isMegaproker && !hideBottomPattern && (
        <img
          src={TImages.BACKGROUNDS.BOTTOM_PATTERN}
          alt="Bottom Background"
          className="absolute bottom-0 w-full h-auto -z-10 object-cover"
        />
      )}
    </div>
  );
};

export default MainLayout;