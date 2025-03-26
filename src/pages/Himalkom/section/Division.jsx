import React from "react";
import { RxCaretRight } from "react-icons/rx";

// Departement Section (API nya division dah)

/* Card untuk departemen (Komponen Internal)*/
const DeptCard = ({ division }) => (
  <div className="w-[287px] h-[342px] rounded-[15px] bg-white shadow-[0px_0px_8px_0.3px_rgba(175,225,234,0.8)] flex flex-col items-center justify-evenly p-8"> 
    <h1 className="text-5xl font-bold">{division.abbreviation}</h1>
    <h1>{division.name}</h1>
    <div className="w-[120px] h-[26px] rounded-[3px] shadow-[0px_0px_2px_0.3px_rgba(175,225,234,0.8)] flex flex-row items-center gap-1 justify-items-center" >
      <p className="font-medium">Selengkapnya</p>
      <div className="w-[19px] h-[20px] rounded-[3px] bg-[#AFE1EA] flex items-center">
        <RxCaretRight className="stroke-1"/>
      </div>
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