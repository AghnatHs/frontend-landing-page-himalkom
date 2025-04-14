import React from "react";
import ReadMoreButton from '@/components/common/ReadMore';
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MotionReveal from '@/components/common/MotionReveal';

// Departement Section (API nya division dah)

/* Card untuk departemen (Komponen Internal)*/
const DeptCard = ({ division, baseUrl }) => (
  <div className="rounded-[15px] bg-white shadow-[0px_0px_8px_0.3px_rgba(175,225,234,0.8)] flex flex-col items-center justify-between p-6 w-[170px] h-[245px] md:w-[240px] md:h-[270px] lg:w-[270px] xl:w-[270px] xl:h-[300px]"> 
    <img
      src={`${baseUrl}/storage/${division.logo}`}
      alt={division.name}
      className="w-[120px] h-[100px] "
    />
    <h1 className="font-semibold text-sm md:text-2xl text-center pt-2 ">{division.name}</h1>
      <div className="mt-4">
        <ReadMoreButton to={`/division/${division.slug}`} />
      </div>
  </div>
);

/* Grid Departemen  */
const Division = ({ divisionData, divisionLoading, divisionError, baseUrl }) => {
  if (divisionLoading) return <LoadingSpinner variant="section" size="large" message="Memuat data departemen..." />;
  if (divisionError) return <p className="text-red-500 font-bold text-xl text-center">Error: {divisionError}</p>;
  if (!divisionData || !divisionData.divisions) return null;

  return (
    <div className="gap-y-6 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-[43px] justify-items-center mx-auto max-w-6xl lg:pt-[70px]">
      {divisionData.divisions.map((division, index) => (
        <MotionReveal 
          key={division.id} 
          animation="fade-up" 
          delay={0.1 + (index * 0.05)}
        >
          <DeptCard 
            division={division} 
            baseUrl={baseUrl}
          />
        </MotionReveal>
      ))}
    </div>
  );
};

export default Division;