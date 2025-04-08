import React from 'react';
import TImages from '../utils/images';
import { useLocation } from "react-router-dom";


const MainLayout = ({ children }) => {
  const location = useLocation();
  
  // Jika pathname adalah "/megaproker", maka tidak tampilkan bottom pattern
  const hideBottomPattern = location.pathname === "/megaproker";

  return (
    <div className="relative min-h-screen flex-1 md:pt-14 lg:pt-16"> 

      <div className="absolute inset-0 w-full h-full -z-10 bg-primary-light/30"> 
        <img
          src={TImages.BACKGROUNDS.HERO_PATTERN}
          alt="Hero Background"
          className="absolute w-full object-cover lg:-top-24 h-96 sm:h-[500px] md:h-[600px] lg:h-[780px] xl:h-[920px] "
        />
      </div>
      
      <div className="relative overflow-hidden">
        {children}
      </div>

      {!hideBottomPattern && (
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