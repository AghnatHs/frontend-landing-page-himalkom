import React from 'react';
import TImages from '../../../utils/images';

// Header Desc Section
const DescSection = ({title, altText, width}) => (
  <div className='flex flex-col mb-[10px] '>
    {/* Judul */}
    <h1 className="font-semibold pb-[10px] text-[48px] leading-11">{title}</h1>
    {/* Garis */}
    <img
      src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
      alt={altText}
      className={width}
    />
  </div>
);
export default DescSection;
