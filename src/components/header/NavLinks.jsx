import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
 /*  const [isCommunityOpen, setIsCommunityOpen] = useState(false); */
  const profileRef = useRef(null);
  const departmentRef = useRef(null);
 /*  const communityRef = useRef(null); */

  const closeDropdown = () => {
    setIsProfileOpen(false);
    setIsDepartmentOpen(false);
    /* setIsCommunityOpen(false); */
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (departmentRef.current && !departmentRef.current.contains(event.target)) {
        setIsDepartmentOpen(false);
      }
     /*  if (communityRef.current && !communityRef.current.contains(event.target)) {
        setIsCommunityOpen(false);
      } */
    }
    

    if (isProfileOpen || isDepartmentOpen /* || isCommunityOpen */) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, isDepartmentOpen/* , isCommunityOpen */]);

  return (
    <div className="nav-links flex gap-[61px] w-1/3 font-athiti">
      <NavLink className="text-black font-bold opacity-60 transition-all hover:opacity-100 hover:text-white hover:font-bold hover:[text-shadow:_2px_2px_0_black] hover:[-webkit-text-stroke:1px_black]" to="/home" onClick={closeDropdown}>Home</NavLink>

      <div className="relative" ref={profileRef}>
        <button className="text-black font-bold opacity-60 transition-all hover:opacity-100 hover:text-white hover:font-bold hover:[text-shadow:_2px_2px_0_black] hover:[-webkit-text-stroke:1px_black]" onClick={() => setIsProfileOpen(!isProfileOpen)}>
          Profil 
        </button>
        {isProfileOpen && (
          <div className={`absolute mt-5 w-60 border font-bold border-black bg-white shadow-lg rounded-md p-2 flex flex-col gap-2 transition-all duration-300 transform origin-top ${isProfileOpen ? "max-h-96 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"}`}>
            <NavLink className="block px-4 py-2 hover:bg-purple-300 rounded-md transition" to="/himalkom" onClick={closeDropdown}>Himalkom</NavLink>
            <button className="block w-full text-left px-4 py-2 hover:bg-purple-300 rounded-md transition" onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}>
              Departemen 
            </button>
            {isDepartmentOpen && (
              <div className={`absolute mt-24 ml-25 w-56 border font-bold border-black bg-white shadow-lg rounded-md flex flex-col transition-all duration-300 transform origin-top ${isDepartmentOpen ? "max-h-100 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"}`}>
                <NavLink className="px-4 py-2 hover:bg-purple-300 transition" to="/bp" onClick={closeDropdown}>BP</NavLink>
                <NavLink className="px-4 py-2 hover:bg-purple-300 transition" to="/bph" onClick={closeDropdown}>BPH</NavLink>
                <NavLink className="px-4 py-2 hover:bg-purple-300 transition" to="/academic" onClick={closeDropdown}>Academic & Exploration</NavLink>
                <NavLink className="px-4 py-2 hover:bg-purple-300 transition" to="/business" onClick={closeDropdown}>Business Ventures</NavLink>
                <NavLink className="px-4 py-2 hover:bg-purple-300 transition" to="/external" onClick={closeDropdown}>External and Social Affairs</NavLink>
                <NavLink className="px-4 py-2 hover:bg-purple-300 transition" to="/internal" onClick={closeDropdown}>Humaniora and Internalization</NavLink>
                <NavLink className="px-4 py-2 hover:bg-purple-300 transition" to="/creative" onClick={closeDropdown}>Creative and Media Branding</NavLink>
                <NavLink className="px-4 py-2 hover:bg-purple-300 transition" to="/ristek" onClick={closeDropdown}>Research and Technology</NavLink>
              </div>
            )}
          </div>
        )}
      </div>

      <NavLink className="text-black font-bold opacity-60 transition-all hover:opacity-100 hover:text-white hover:font-bold hover:[text-shadow:_2px_2px_0_black] hover:[-webkit-text-stroke:1px_black]" to="/komunitas" onClick={closeDropdown}>Komunitas</NavLink>
      <NavLink className="text-black font-bold opacity-60 transition-all hover:opacity-100 hover:text-white hover:font-bold hover:[text-shadow:_2px_2px_0_black] hover:[-webkit-text-stroke:1px_black]" to="/komnews" onClick={closeDropdown}>Komnews</NavLink>
      <NavLink className="text-black font-bold opacity-60 transition-all hover:opacity-100 hover:text-white hover:font-bold hover:[text-shadow:_2px_2px_0_black] hover:[-webkit-text-stroke:1px_black]" to="/galeri" onClick={closeDropdown}>Galeri</NavLink>
      <NavLink className="text-black font-bold opacity-60 transition-all hover:opacity-100 hover:text-white hover:font-bold hover:[text-shadow:_2px_2px_0_black] hover:[-webkit-text-stroke:1px_black]" to="/megaproker" onClick={closeDropdown}>Megaproker</NavLink>
      <NavLink className="text-black font-bold opacity-60 transition-all hover:opacity-100 hover:text-white hover:font-bold hover:[text-shadow:_2px_2px_0_black] hover:[-webkit-text-stroke:1px_black]" to="/riset" onClick={closeDropdown}>Riset</NavLink>
    </div>
  );
};

export default NavLinks;