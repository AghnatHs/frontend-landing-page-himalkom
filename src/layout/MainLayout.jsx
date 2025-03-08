import React from 'react';
import TImages from '../utils/images';

const MainLayout = ({ children }) => {
  return (
    <div className="relative">
      <img
        src={TImages.BACKGROUNDS.HERO_PATTERN}
        alt="Hero Background"
        className="absolute w-full h-auto -z-10 object-cover"
      />
      <div className="relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;