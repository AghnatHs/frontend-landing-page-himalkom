import { useState, useEffect, useRef } from 'react';
import { RxTextAlignJustify, RxCross2  } from "react-icons/rx";
import Logo from './Logo';
import NavLinks from './NavLinks';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav>
        <div className="hidden z-50 justify md:flex">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavbar}>
            {isOpen ? <RxCross2 /> : <RxTextAlignJustify />}
          </button>
        </div>
      </nav>
    </>
  );
};

const Header = () => {
  return (
    <header className="z-50 w-screen mx-auto flex flex-wrap items-center px-[5vw] py-[1vw] justify-between bg-[#AFE1EA]">
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;