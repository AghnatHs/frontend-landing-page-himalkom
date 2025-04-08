import React from "react";
import ReadMoreButton from "@/components/common/ReadMore";
import ScrollReveal from '@/components/common/ScrollReveal';

const Card = ({ research, baseUrl }) => (
  <div className="shadow-card rounded-2xl flex flex-col bg-white w-[177px] h-[390px] sm:w-[250px] sm:h-[460px] md:w-[250px] md:h-[460px] lg:w-[370px] lg:h-[620px]">
    <div className="">
      <img 
        src={`${baseUrl}/storage/${research.image}`}
        alt={research.title} 
        className="w-full h-[220px] sm:h-[300px] md:h-[300px] lg:h-[450px] rounded-2xl shadow-card"
      />
    </div>
    <div className="p-2 lg:p-4">
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

const RisCard = ({ data, baseUrl }) => {

  const scrollRevealOptions = {
    threshold: 0.2,         
    rootMargin: "-100px 0px",  
    triggerOnce: false       
  };
  return (
    <ScrollReveal animation="fade-up" options={scrollRevealOptions} delay={300}>
      <div className="justify-items-center mx-auto max-w-6xl gap-y-4 gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 lg:gap-[50px] lg:pt-[70px]">
        {data.research.map((research) => (
          <Card 
            key={research.id}
            research={research} 
            baseUrl={baseUrl}
         />
       ))}
      </div>
    </ScrollReveal>
  );
};

export default RisCard;