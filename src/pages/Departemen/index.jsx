import React from 'react';
import { useParams } from "react-router-dom";

// Import custom hooks
import { useFetchData } from '@/hooks/useAPI';

// Import reusable components
import SectionHeader from '@/components/common/SectionHeader';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Import sections
import StaffSection from './sections/Staff';
import HeroSection from './sections/Hero';
import ProkerSection from './sections/Proker';

/**
 * Departemen page component
 */
const Departemen = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { slug } = useParams();

  // Fetch data departemen
  const { data, loading, error } = useFetchData(`divisions/${slug}`, baseUrl);
  const division = data?.division;

  // Handle loading and error states
  if (loading) return <LoadingSpinner variant="page" size="large" message="Memuat data departemen..." />;
  if (error) return <p className="text-red-500 font-bold text-xl text-center font-athiti">Error: {error}</p>;
  if (!division) return null;

  return (
    <div className='w-full'>
      {/* Hero Section */}
      <HeroSection department={division}/>

      {/* Staff Section */}
      <section className="px-4 flex flex-col mt-[250px] items-center font-athiti">
        <StaffSection staff={division.staff} baseUrl={baseUrl} />
      </section>

      {/* Program Kerja Section */}
      <section className="px-4 flex flex-col mt-[200px] mb-[200px] items-center font-athiti">
        <SectionHeader title="PROGRAM KERJA" altText="Garis Program Kerja" />
        <ProkerSection proker={division.work_programs} baseUrl={baseUrl} />
      </section>
    </div>
  );
};

export default Departemen;