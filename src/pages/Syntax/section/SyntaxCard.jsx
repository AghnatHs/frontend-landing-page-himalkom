import React from "react";
import ReadMoreButton from "@/components/common/ReadMore";

const Card = ({ syntaxes, baseUrl }) => (
  <div className="w-[170px] h-[410px] md:w-[300px] md:h-[570px] shadow-card rounded-2xl flex flex-col items-center bg-white lg:w-[364px] lg:h-[700px]">
    <div className="">
      <img 
        src={`${baseUrl}/storage/${syntaxes.image}`}
        alt={syntaxes.title} 
        className="rounded-2xl shadow-card"
      />
    </div>
    <div className="p-2 lg:items-center lg:p-4">
      <div className="justify-evenly text-start">
        <h1 className="font-medium text-[16px] lg:text-xl">{syntaxes.title}</h1>
        <p className="font-light text-[15px] lg:text-xl ">{syntaxes.year}</p>
      </div>
      <div className="place-items-start pt-3">
        <ReadMoreButton to={syntaxes.link}/>
      </div>
    </div>
  </div>
);

const SynCard = ({ syntaxesData, syntaxesLoading, syntaxesError, baseUrl }) => {
  if (syntaxesLoading) return <p className="text-center">Loading syntaxes...</p>;
  if (syntaxesError) return <p className="text-red-500 font-bold text-xl text-center">Error: {syntaxesError}</p>;
  if (!syntaxesData || !syntaxesData.syntaxes) return null;

  return (
    <div className="gap-y-4 gap-8 grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 lg:gap-[43px] justify-items-center mx-auto max-w-6xl lg:pt-[70px]">
      {syntaxesData.syntaxes.map((syntaxes) => (
        <Card 
          key={syntaxes.id}
          syntaxes={syntaxes} 
          baseUrl={baseUrl}
        />
      ))}
    </div>
  );
};

export default SynCard;