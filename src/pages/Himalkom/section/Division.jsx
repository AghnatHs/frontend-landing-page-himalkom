import React from "react";

const DeptCard = ({ division }) => (
  <div className="w-[287px] h-[274px] rounded-[15px] bg-white shadow-[0px_0px_8px_0.3px_rgba(105,83,207,0.39)] flex items-center justify-evenly p-8"> 
    <h1 className="text-5xl font-bold">{division.abbreviation}</h1>
  </div>
);

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