import React from "react";
import MainLayout from "@/layout/MainLayout";
import HeroSection from "./sections/HeroSection";
import JawaraList from "./sections/JawaraList";
import { useFetchData } from "@/hooks/useAPI";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Jawara = () => {
  const { data, loading, error } = useFetchData("jawara-ilkomerzs", BASE_URL);
  const jawaraIlkomerzs = data?.jawaraIlkomerzs || [];

  return (
    <MainLayout>
      <HeroSection />
      <div className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="text-center py-10 text-primary-dark font-semibold">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <JawaraList jawaraIlkomerzs={jawaraIlkomerzs} />
        )}
      </div>
    </MainLayout>
  );
};

export default Jawara;
