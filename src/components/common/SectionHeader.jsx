import React from 'react';
import TImages from '../../utils/images';

/**
 * Header untuk setiap section dengan judul dan garis dekoratif
 * @param {string} title - Judul section
 * @param {string} altText - Alt text untuk gambar
 */
const SectionHeader = ({ title, altText }) => (
  <div className='flex flex-col items-center mb-10 lg:mb-24'>
    <h1 className="text-3xl font-bold text-center text-[32px] leading-11">{title}</h1>
    <img
      src={TImages.DECORATIVE_ELEMENTS.GARIS_ILKOMMUNITY}
      alt={altText}
      className="w-[150px] mb-4"
    />
  </div>
);

export default SectionHeader;