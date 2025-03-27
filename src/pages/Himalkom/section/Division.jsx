import React from "react";
import { FaAngleRight } from "react-icons/fa6"; 
import { Link } from "react-router-dom";

// Departement Section (API nya division dah)

/* Card untuk departemen (Komponen Internal)*/
const DeptCard = ({ division }) => (
  <div className="w-[287px] h-[342px] rounded-[15px] bg-white shadow-[0px_0px_8px_0.3px_rgba(175,225,234,0.8)] flex flex-col items-center justify-evenly p-8"> 
    <h1 className="text-5xl font-bold">{division.abbreviation}</h1>

    <h1>{division.name}</h1>

    <div className="mt-8 rounded-lg shadow-[0px_0px_8px_0.3px_rgba(105,83,207,0.39)] hover:shadow-[0px_0px_10px_1px_rgba(105,83,207,0.6)] transition-all duration-300 min-w-14 p-1 w-full">
        <Link 
          to={`/division/${division.slug}`}
          className="flex items-center justify-between w-full transition-all duration-300 px-1 py-0.5 group">
          <span className="text-sm font-medium mx-1 text-gray-700 group-hover: transition-colors duration-300">
            Selengkapnya
          </span>
          <div className="bg-[#AFE1EA] p-0.5 rounded flex items-center justify-center transition-all duration-300 group-hover:bg-[#8CCED8] group-hover:transform group-hover:translate-x-1">
            <FaAngleRight size={16} className="text-black transition-all duration-300" />
          </div>
        </Link>
      </div>
  </div>
);

/* Grid Departemen  */
const Division = ({ divisionData, divisionLoading, divisionError, baseUrl }) => {
  if (divisionLoading) return <p className="text-center">Loading division...</p>;
  if (divisionError) return <p className="text-red-500 font-bold text-xl text-center">Error: {divisionError}</p>;
  if (!divisionData || !divisionData.divisions) return null;

  return (
    <>
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[43px] justify-items-center mx-auto max-w-6xl pt-[70px]">
        {divisionData.divisions.map((division) => (
          <DeptCard 
            key={division.id}
            division={division} 
            baseUrl={baseUrl}
          />
        ))}
      </div>
    </>
  );
};

export default Division;