import React from 'react';
import TImages from '../utils/images';

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex-1">
      <img
        src={TImages.BACKGROUNDS.HERO_PATTERN}
        alt="Hero Background"
        className="absolute w-full h-auto -z-10 object-cover"
      />
      <div className="relative overflow-hidden">
        {children}
      </div>
      <img 
        src={TImages.BACKGROUNDS.BOTTOM_PATTERN}
        alt="Bottom Background"
        className="absolute bottom-0 w-full h-auto -z-10 object-cover"
      />
    </div>
  );
};

export default MainLayout;