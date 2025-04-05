import React from "react";
import { useFetchData } from "../../hooks/useAPI";

import HeroSection from "./section/HeroSection";
import SynCard from "./section/SyntaxCard";

const Syntax = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Data API
  const { 
    data: syntaxesData, 
    loading: syntaxesLoading, 
    error: syntaxesError 
  } = useFetchData('syntaxes', baseUrl);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Riset */}
      <section className="px-4 flex flex-col items-center text-center my-[280px]">
        <SynCard 
        syntaxesData={syntaxesData}
        syntaxesError={syntaxesError}
        syntaxesLoading={syntaxesLoading}
        baseUrl={baseUrl}
        />
      </section>
    </>
  );
};

export default Syntax;