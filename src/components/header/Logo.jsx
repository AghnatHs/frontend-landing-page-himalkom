import { NavLink } from 'react-router-dom';
import TImages from '../../utils/images';

const Logo = () => {
  return (
    <NavLink to="/home" className="block py-1">
      <img 
        src={TImages.LOGO.LOGO_HIMALKOM} 
        alt="HIMALKOM" 
        className="w-12 h-12 object-contain transition-transform hover:scale-110"
      />
    </NavLink>
  );
};

export default Logo;