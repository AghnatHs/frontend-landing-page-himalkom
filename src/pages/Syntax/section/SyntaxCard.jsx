import React from "react";
import ReadMoreButton from "@/components/common/ReadMore";
import MotionReveal from '@/components/common/MotionReveal';

const CardItem = ({ syntaxes }) => (
  <div className="shadow-card rounded-2xl flex flex-col bg-white w-[170px] h-[360px] sm:w-[230px] sm:h-[420px] md:w-[230px] md:h-[430px] lg:w-[380px] lg:h-[600px] xl:w-[330px] ">
    <div className="">
      <img 
        src={syntaxes.image}
        alt={syntaxes.title} 
        className="w-full h-[230px] sm:h-[300px] md:h-[300px] lg:h-[450px] rounded-2xl shadow-card"
      />
    </div>
    <div className="p-2 lg:p-4">
      <div className="justify-evenly text-start">
        <h1 className="font-medium text-[16px] md:text-xl">{syntaxes.title}</h1>
        <p className="font-light text-[15px] md:text-xl ">{syntaxes.year}</p>
      </div>
      <div className="place-items-start pt-4">
        <ReadMoreButton to={syntaxes.link}/>
      </div>
    </div>
  </div>
);

const SynCard = ({ data, baseUrl }) => {
  return (
    <MotionReveal animation="fade-up" delay={0.3}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {data.map((syntaxes, index) => (
          <CardItem 
            key={`syntax-${index}`}
            syntaxes={syntaxes}
          />
        ))}
      </div>
    </MotionReveal>
  );
};

export default SynCard;