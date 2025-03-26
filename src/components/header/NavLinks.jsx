import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useFetchData } from '../../hooks/useAPI';

const communities = [
  { name: "Agriux", slug: "agriux" },
  { name: "IWDC", slug: "iwdc" },
];

const NavLinks = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [divisions, setDivisions] = useState([]);
  
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { data: divisionsData } = useFetchData('divisions', baseUrl);

  useEffect(() => {
    if (divisionsData && divisionsData.divisions) {
      setDivisions(divisionsData.divisions);
    }
  }, [divisionsData]);

  const profileRef = useRef(null);
  const departmentRef = useRef(null);
  const communityRef = useRef(null);

  const closeDropdown = () => {
    setIsProfileOpen(false);
    setIsDepartmentOpen(false);
    setIsCommunityOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (departmentRef.current && !departmentRef.current.contains(event.target)) {
        setIsDepartmentOpen(false);
      }
      if (communityRef.current && !communityRef.current.contains(event.target)) {
        setIsCommunityOpen(false);
      }
    }

    if (isProfileOpen || isDepartmentOpen || isCommunityOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, isDepartmentOpen, isCommunityOpen]);

  return (
    <div className="nav-links flex gap-[61px] w-1/3 font-athiti">
      <NavLink className="text-black transition-all hover:opacity-70" to="/home" onClick={closeDropdown}>Home</NavLink>

      <div className="relative" ref={profileRef}>
        <button className="text-black transition-all hover:opacity-70" onClick={() => setIsProfileOpen(!isProfileOpen)}>
          Profil 
        </button>
        {isProfileOpen && (
          <div className={`absolute mt-5 w-60 border  border-black bg-white shadow-lg rounded-md p-2 flex flex-col gap-2 transition-all duration-300 transform origin-top ${isProfileOpen ? "max-h-96 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"}`}>
            <NavLink className="block px-4 py-2 hover:bg-purple-300 rounded-md transition" to="/himalkom" onClick={closeDropdown}>Himalkom</NavLink>
            
            {/* Ganti NavLink dengan button untuk departemen */}
            <button 
              className="text-left px-4 py-2 hover:bg-purple-300 rounded-md transition flex justify-between items-center" 
              onClick={(e) => {
                e.stopPropagation(); // Mencegah event bubble ke parent
                setIsDepartmentOpen(!isDepartmentOpen);
              }}
            >
              <span>Departemen</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className={`transition-transform duration-300 ${isDepartmentOpen ? 'rotate-180' : ''}`}
              >
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
            
            {/* Referensi untuk departmentRef */}
            <div ref={departmentRef} className="relative">
              {isDepartmentOpen && (
                <div className="absolute left-full top-[-40px] w-56 border  border-black bg-white shadow-lg rounded-md flex flex-col transition-all duration-300 transform origin-top">
                  {divisions.map(division => (
                    <NavLink 
                      key={division.id} 
                      className="px-4 py-2 hover:bg-purple-300 transition" 
                      to={`/division/${division.slug}`} 
                      onClick={closeDropdown}
                    >
                      {division.abbreviation || division.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative" ref={communityRef}>
      <button
        className="text-black transition-all hover:opacity-70"
        onClick={() => setIsCommunityOpen(!isCommunityOpen)}
      >
        Komunitas
      </button>
      {isCommunityOpen && (
        <div className="absolute mt-5 w-60 border  border-black bg-white shadow-lg rounded-md p-2 flex flex-col gap-2 transition-all duration-300 transform origin-top max-h-96 opacity-100 scale-100">
          {communities.map((community) => (
            <NavLink
              key={community.slug}
              className="block px-4 py-2 hover:bg-purple-300 rounded-md transition"
              to={`/community/${community.slug}`}
              onClick={closeDropdown}
            >
              {community.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>


      <NavLink className="text-black transition-all hover:opacity-70 hover:text-slate-500" to="/komnews" onClick={closeDropdown}>Komnews</NavLink>
      <NavLink className="text-black transition-all hover:opacity-70 hover:text-slate-500" to="/galeri" onClick={closeDropdown}>Galeri</NavLink>
      <NavLink className="text-black transition-all hover:opacity-70 hover:text-slate-500" to="/megaproker" onClick={closeDropdown}>Megaproker</NavLink>
      <NavLink className="text-black transition-all hover:opacity-70 hover:text-slate-500" to="/riset" onClick={closeDropdown}>Riset</NavLink>
    </div>
  );
};

export default NavLinks;