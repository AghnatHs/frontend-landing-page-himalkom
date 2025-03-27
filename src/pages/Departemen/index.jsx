import React from 'react';
import { useParams } from "react-router-dom";

// Import custom hooks
import { useFetchData } from '../../hooks/useAPI';

// Import reuse komponen
import SectionHeader from '../../components/common/SectionHeader';
import TImages from '../../utils/images';

// Import section
import StaffSection from './sections/Staff';

const Departemen = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { slug } = useParams();

  // Fetch data departemen
  const { data, loading, error } = useFetchData(`divisions/${slug}`, baseUrl);
  const division = data?.division;

  if (loading) return <p className="text-center">Loading division data...</p>;
  if (error) return <p className="text-red-500 font-bold text-xl text-center">Error: {error}</p>;
  if (!division) return null;

  return (
    <>
      {/* Hero Section */}
      <section className="font-athiti">
        <div id="hero-section" className="flex justify-center gap-24 items-center mt-50 w-full px-4">
          <div className="flex flex-col text-left">
            <h1 className="font-semibold text-black pb-5 text-[80px] sm:text-[90px] md:text-[110px] leading-tight">
              {division.abbreviation || division.name}
            </h1>
            <img
              src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
              alt="Garis Elevor"
              className="w-[361px] mb-4"
            />
            <h2 className="text-2xl sm:text-3xl font-medium">{division.name}</h2>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="relative font-athiti max-w-4xl mx-auto my-[20rem] text-[1.5rem] leading-relaxed">
        <p>{division.description}</p>
        <img
          src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          alt="Garis Elevor"
          className="w-[361px] my-4"
        />
      </section>

      {/* Staff Section */}
      <section className="px-4 flex flex-col mt-[250px] items-center">
        <SectionHeader title="KABINET" altText="Garis Kabinet" />
        <StaffSection staff={division.staff} />
      </section>

      {/* Dokumen Section jika diperlukan */}
      {division.documents && division.documents.length > 0 && (
        <section className="px-4 flex flex-col mt-[200px]">
          <SectionHeader title="DOKUMEN" altText="Garis Dokumen" />
          <div className="flex justify-center flex-wrap gap-8">
            {division.documents.map((doc, index) => (
              <a 
                key={index}
                href={`${baseUrl}/storage/${doc.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white shadow-md rounded-lg hover:shadow-xl transition-all"
              >
                {doc.name || `Dokumen ${index + 1}`}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Program Kerja Section */}
      <section className="px-4 flex flex-col mt-[200px] mb-[200px]">
        <SectionHeader title="PROGRAM KERJA" altText="Garis Program Kerja" />
        <div className="flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-xl w-[768px] border border-purple-100">
            {division.programs && division.programs.length > 0 ? (
              <ul className="list-disc py-4 px-10 space-y-2 font-athiti text-[22px]">
                {division.programs.map((program, index) => (
                  <li key={index}>{program.name}</li>
                ))}
              </ul>
            ) : (
              <p className="py-6 px-10 text-center text-gray-500 font-athiti text-[22px]">Coming Soon</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Departemen;