import React from "react";
import { useFetchData } from "../../hooks/useAPI";

import HeroSection from "./section/HeroSection";
import RisCard from "./section/RisetCard";

const Riset = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Data API
  const { data: researchData, loading: researchLoading, error: researchError } = useFetchData('research', baseUrl);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Riset */}
      <section className="px-4 flex flex-col items-center text-center my-[280px]">
        <RisCard 
        researchData={researchData}
        researchError={researchError}
        researchLoading={researchLoading}
        baseUrl={baseUrl}
        />
      </section>
    </>
  );
};

export default Riset;