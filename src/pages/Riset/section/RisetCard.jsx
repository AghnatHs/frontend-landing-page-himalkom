import React from "react";

const Card = ({ research, baseUrl }) => (
  <div className="w-[400px] h-[650px] rounded-[15px] flex flex-col items-center p-8">
    <div className="">
    <img 
      src={`${baseUrl}/storage/${research.image}`}
      alt={research.title} 
      className="shadow-2xl"
    />
    </div>
    <div className="pt-4 justify-evenly text-start">
      <h1 className="font-bold text-xl">{research.title}</h1>
      <p className="font-light">{research.year}</p>
      <a 
        href={research.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-800 underline"
      >
        Baca Selengkapnya
      </a>
    </div>
  </div>
);

const RisCard = ({ researchData, researchLoading, researchError, baseUrl }) => {
  if (researchLoading) return <p className="text-center">Loading research...</p>;
  if (researchError) return <p className="text-red-500 font-bold text-xl text-center">Error: {researchError}</p>;
  if (!researchData || !researchData.research) return null;

  return (
    <div className="gap-y-6 grid sm:gap-6 lg:grid-cols-2 xl:grid-cols-3 lg:gap-[43px] justify-items-center mx-auto max-w-6xl lg:pt-[70px]">
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