import React from "react";
import ReadMoreButton from '@/components/common/ReadMore';
import LoadingSpinner from "@/components/common/LoadingSpinner";

// Departement Section (API nya division dah)

/* Card untuk departemen (Komponen Internal)*/
const DeptCard = ({ division, baseUrl }) => (
  <div className="rounded-[15px] bg-white shadow-[0px_0px_8px_0.3px_rgba(175,225,234,0.8)] flex flex-col items-center justify-evenly p-8 w-[170px] h-[240px] md:w-[240px] lg:h-[250px] lg:w-[270px] xl:w-[270px] xl:h-[300px]"> 
    <img
      src={`${baseUrl}/storage/${division.logo}`}
      alt={division.name}
      className=""
    />
    <h1 className="font-semibold text-2xl text-center ">{division.name}</h1>
      <div className="mt-4">
        <ReadMoreButton to={`/division/${division.slug}`} />
      </div>
  </div>
);

/* Grid Departemen  */
const Division = ({ divisionData, divisionLoading, divisionError, baseUrl }) => {
  if (divisionLoading) return <LoadingSpinner variant="section" size="large" message="Memuat data research..." />;
  if (divisionError) return <p className="text-red-500 font-bold text-xl text-center">Error: {divisionError}</p>;
  if (!divisionData || !divisionData.divisions) return null;

  return (
    <>
      <div className="gap-y-6 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-[43px] justify-items-center mx-auto max-w-6xl lg:pt-[70px]">
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