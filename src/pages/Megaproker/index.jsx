import React from "react";

// Import custom hook
import { useFetchData } from "../../hooks/useAPI";

// Import reusable components
import LoadingSpinner from "@/components/common/LoadingSpinner";

// Import section
import HeroSection from "./section/HeroSection";
import MegaprokerSection from "./section/Megaproker";

const Megaproker = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Data API
  const { data, loading, error } = useFetchData('megaprokers', baseUrl);
  const megaprokers = data?.megaprokers;

  if (loading) return <LoadingSpinner variant="page" size="large" message="Memuat data megaproker..." />;
  if (error) return <p className="text-red-500 font-bold text-xl text-center">Error: {error}</p>;
  if (!megaprokers) return <p className="text-center">Tidak ada data megaproker yang tersedia.</p>;
  
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Megaproker */}
      <section className="w-full my-[350px] space-y-20">
        {megaprokers.map((megaprokers, index) => (
          <MegaprokerSection 
            key={megaprokers.id || index} 
            megaprokers={megaprokers} 
            index={index} 
            baseUrl={baseUrl} 
          />
        ))}
      </section>
    </>
  );
};

export default Megaproker;