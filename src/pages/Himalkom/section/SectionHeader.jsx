import React from 'react';
import TImages from '../../../utils/images';

const DescSection = ({title, altText, width}) => (
  <div className='flex flex-col  mb-[10px] '>
    <h1 className="font-semibold pb-[10px] text-[48px] leading-11">{title}</h1>
    <img
      src={TImages.DECORATIVE_ELEMENTS.GARIS_HIMALKOM}
      alt={altText}
      className={width}
    />
</div>


);

export default DescSection;
