import React from "react";

// Import custom hooks
import { useFetchData } from "@/hooks/useAPI";

// Import reusable components
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MotionReveal from '@/components/common/MotionReveal';

// Import sections
import HeroSection from "./section/HeroSection";
import SynCard from "./section/SyntaxCard";

const Syntax = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Data API
  const { data, loading, error } = useFetchData('syntaxes', baseUrl);
  const syntaxes = data?.syntaxes;

  if (loading) return <LoadingSpinner variant="page" size="large" message="Memuat data syntax..." />;
  if (error) return <p className="text-red-500 font-bold text-xl text-center">Error: {error}</p>;
  if (!syntaxes) return null;

  return (
    <div className="w-full">
      <MotionReveal animation="fade-up">
        {/* Header/intro content */}
      </MotionReveal>
      {/* Hero Section */}
      <HeroSection />

      {/* Riset */}
      <section className="px-4 flex flex-col items-center text-center my-[130px] md:my-[150px] lg:my-[280px]">
        <SynCard 
        data={data}
        baseUrl={baseUrl}
        />
      </section>
    </div>
  );
};

export default Syntax;