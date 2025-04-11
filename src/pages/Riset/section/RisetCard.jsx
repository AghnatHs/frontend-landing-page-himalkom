import React from "react";
import MotionReveal from '@/components/common/MotionReveal';
import ReadMoreButton from "@/components/common/ReadMore";

const Card = ({ research, baseUrl }) => (
 <MotionReveal animation="fade-up" delay={0.1}>
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
 </MotionReveal>
);

const RisCard = ({ data, baseUrl }) => {
  return (
      <div className="justify-items-center mx-auto max-w-6xl gap-y-4 gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 lg:gap-[50px] lg:pt-[70px]">
        {data.research.map((research) => (
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