import React from 'react';
import TImages from '../../utils/images';
import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="">
      <NavLink to="/home">
      <img className="w-12" src={TImages.LOGO.LOGO_HIMALKOM} alt="Himalkom" />
      </NavLink>
      
    </div>
  );
};

export default Logo;