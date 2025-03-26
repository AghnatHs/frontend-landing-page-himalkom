import { useState } from 'react';
import { RxTextAlignJustify, RxCross2 } from "react-icons/rx";
import NavLinks from './NavLinks';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav>
        <div className="hidden md:flex ">
          <NavLinks className="font-athiti font-normal text-[19px] text-black text-center leading-[44px]" />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <RxCross2 /> : <RxTextAlignJustify />}
          </button>
          {isOpen && (
            <div className="absolute top-0 left-0 w-full bg-white shadow-lg">
              <NavLinks className="font-athiti text-[19px] text-black text-center font-semibold leading-[44px]" />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
