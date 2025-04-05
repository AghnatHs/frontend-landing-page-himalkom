import React from "react";
import ReadMoreButton from "@/components/common/ReadMore";

const Card = ({ research, baseUrl }) => (
  <div className="w-[170px] h-[410px] md:w-[300px] md:h-[570px] shadow-card rounded-2xl flex flex-col items-center bg-white lg:w-[364px] lg:h-[700px]">
    <div className="">
      <img 
        src={`${baseUrl}/storage/${research.image}`}
        alt={research.title} 
        className="rounded-2xl shadow-card"
      />
    </div>
    <div className="p-2 lg:items-center lg:p-4">
      <div className="justify-evenly text-start">
        <h1 className="font-medium text-[16px] lg:text-xl">{research.title}</h1>
        <p className="font-light text-[15px] lg:text-xl ">{research.year}</p>
      </div>
      <div className="place-items-start pt-3">
        <ReadMoreButton to={research.link}/>
      </div>
    </div>
  </div>
);

const RisCard = ({ researchData, researchLoading, researchError, baseUrl }) => {
  if (researchLoading) return <p className="text-center">Loading research...</p>;
  if (researchError) return <p className="text-red-500 font-bold text-xl text-center">Error: {researchError}</p>;
  if (!researchData || !researchData.research) return null;

  return (
    <div className="gap-y-4 gap-8 grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:gap-[43px] justify-items-center mx-auto max-w-6xl lg:pt-[70px]">
      {researchData.research.map((research) => (
        <Card 
          key={research.id}
          research={research} 
          baseUrl={baseUrl}
        />
      ))}
    </div>
  );
};

export default RisCard;