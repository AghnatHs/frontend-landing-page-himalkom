import React, { useState, useEffect } from 'react';
import { useFetchData } from '@/hooks/useAPI';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MotionReveal from '@/components/common/MotionReveal';
import TImages from '@/utils/images';

// Import sections
import GaleriHero from './sections/HeroSection';
import GaleriFilter from './sections/GaleriFilter';
import GaleriList from './sections/GaleriList';

/**
 * Galeri Page Component
 * 
 * Displays student projects organized by subjects
 * 
 * @returns {JSX.Element}
 */
const Galeri = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [activeSubject, setActiveSubject] = useState('all');
  
  // Fetch gallery data
  const { 
    data: galleriesData, 
    loading: loadingGalleries, 
    error: errorGalleries 
  } = useFetchData('igalleries', baseUrl);
  
  // Fetch subjects data
  const { 
    data: subjectsData, 
    loading: loadingSubjects, 
    error: errorSubjects 
  } = useFetchData('igalleries/subjects', baseUrl);

  // Filter galleries based on active subject
  const filteredGalleries = React.useMemo(() => {
    if (!galleriesData?.igalleries) return [];
    
    if (activeSubject === 'all') {
      return galleriesData.igalleries.flatMap(subject => 
        subject.i_galleries.map(gallery => ({
          ...gallery,
          subjectName: subject.name
        }))
      );
    }
    
    const selectedSubject = galleriesData.igalleries.find(
      subject => subject.id === parseInt(activeSubject) || subject.name === activeSubject
    );
    
    if (!selectedSubject) return [];
    
    return selectedSubject.i_galleries.map(gallery => ({
      ...gallery,
      subjectName: selectedSubject.name
    }));
  }, [galleriesData, activeSubject]);

  const isLoading = loadingGalleries || loadingSubjects;
  const isError = errorGalleries || errorSubjects;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="mt-24 md:mt-32">
        <MotionReveal animation="fade-up">
          <GaleriHero />
        </MotionReveal>
      </section>

      {/* Content Section */}
      <section className="mt-32 mb-64 max-w-6xl mx-auto px-4">
        {isLoading ? (
          <LoadingSpinner variant="section" size="medium" message="Memuat galeri..." />
        ) : isError ? (
          <div className="text-red-500 text-center py-8 bg-red-50 rounded-lg">
            <p>Gagal memuat galeri</p>
            <p className="text-sm mt-2">{errorGalleries || errorSubjects}</p>
          </div>
        ) : (
          <>
            <MotionReveal animation="fade-up" delay={0.1}>
              <GaleriFilter 
                subjects={subjectsData?.igallery_subjects || []}
                activeSubject={activeSubject}
                setActiveSubject={setActiveSubject}
              />
            </MotionReveal>

            <MotionReveal animation="fade-up" delay={0.2} key={`gallery-list-${activeSubject}`}>
              <GaleriList 
                galleries={filteredGalleries}
                baseUrl={baseUrl}
              />
            </MotionReveal>
          </>
        )}
      </section>
    </div>
  );
};

export default Galeri;