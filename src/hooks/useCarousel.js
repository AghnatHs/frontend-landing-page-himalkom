import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook untuk carousel functionality
 * @param {Array} items - Item yang ditampilkan dalam carousel
 * @param {boolean} initialPause - Status awal pause
 * @returns {Object} - Berbagai fungsi untuk mengelola carousel
 */
export const useCarousel = (items, initialPause = false) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(initialPause);

  // Function untuk menentukan pause status
  const setPause = useCallback((shouldPause) => {
    setIsPaused(shouldPause);
  }, []);

  // Function untuk pindah ke slide tertentu
  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Function untuk pindah ke slide sebelumnya
  const goToPrev = useCallback(() => {
    if (!items) return;
    setCurrentIndex(prev => 
      prev === 0 ? items.length - 1 : prev - 1
    );
  }, [items]);

  // Function untuk pindah ke slide berikutnya
  const goToNext = useCallback(() => {
    if (!items) return;
    setCurrentIndex(prev => 
      prev === items.length - 1 ? 0 : prev + 1
    );
  }, [items]);

  useEffect(() => {
    // Auto-rotate jika tidak di-pause
    if (!items || isPaused) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    
    // Clean up interval
    return () => clearInterval(interval);
  }, [items, isPaused, goToNext]);

  return { 
    currentIndex, 
    goToSlide, 
    setPause,
    goToPrev,
    goToNext
  };
};