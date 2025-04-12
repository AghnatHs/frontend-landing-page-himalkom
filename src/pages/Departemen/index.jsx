import React from 'react';
import { useParams } from 'react-router-dom';

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
 * Displays detailed information about a specific department
 * including hero section, staff members, and work programs
 * 
 * @returns {JSX.Element}
 */
const Departemen = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { slug } = useParams();

  // Fetch department data
  const { data, loading, error } = useFetchData(`divisions/${slug}`, baseUrl);
  const division = data?.division;

  // Handle loading and error states
  if (loading) return <LoadingSpinner variant="page" size="large" message="Memuat data departemen..." />;
  if (error) return <p className="text-red-500 font-bold text-xl text-center font-athiti">Error: {error}</p>;
  if (!division) return null;

  return (
    <div className='w-full'>
      {/* Hero Section */}
      <HeroSection department={division} baseUrl={baseUrl}/>

      {/* Staff Section */}
      <section className="px-4 flex flex-col lg:mt-96 md:mt-64 items-center font-athiti">
        <SectionHeader title="Staff" altText="Staff List" />
        <StaffSection staff={division.staff} baseUrl={baseUrl} />
      </section>

      {/* Program Kerja Section */}
      <section className="px-4 flex flex-col mt-[200px] mb-[200px] items-center font-athiti">
        <SectionHeader title="Program Kerja" altText="Garis Program Kerja" />
        <ProkerSection proker={division.work_programs} baseUrl={baseUrl} />
      </section>
    </div>
  );
};

export default Departemen;