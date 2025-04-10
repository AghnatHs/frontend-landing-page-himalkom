import React from "react";

// Import custom hook
import { useFetchData } from "../../hooks/useAPI";

// Import reusable components
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MotionReveal from '@/components/common/MotionReveal';

// Import section
import HeroSection from "./section/HeroSection";
import RisCard from "./section/RisetCard";

const Riset = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Data API
  const { data, loading, error } = useFetchData('research', baseUrl);
  const research = data?.research;

  if (loading) return <LoadingSpinner variant="page" size="large" message="Memuat data research..." />;
  if (error) return <p className="text-red-500 font-bold text-xl text-center">Error: {error}</p>;
  if (!research) return null;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="mt-24 md:mt-32">
        <MotionReveal animation="fade-up">
          <HeroSection />
        </MotionReveal>
      </section>

      {/* Main content */}
      <section className="mt-16">
        <MotionReveal animation="fade-up" delay={0.2}>
          <div className="px-4 flex flex-col items-center text-center my-[130px] md:my-[150px] lg:my-[280px]">
            <RisCard 
              data={data}
              baseUrl={baseUrl}
            />
          </div>
        </MotionReveal>
      </section>
    </div>
  );
};

export default Riset;