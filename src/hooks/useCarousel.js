import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook untuk carousel functionality
 * @param {Array} items - Item yang ditampilkan dalam carousel
 * @param {boolean} initialPause - Status awal pause
 * @returns {Object} - Current index, fungsi untuk pindah slide, dan fungsi pause
 */
export const useCarousel = (items, initialPause = false) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(initialPause);

  const setPause = useCallback((shouldPause) => {
    setIsPaused(shouldPause);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    // Jangan mulai interval jika tidak ada items atau carousel di-pause
    if (!items || isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      ));
    }, 5000);
    
    // Clean up interval
    return () => clearInterval(interval);
  }, [items, isPaused]);

  return { currentIndex, goToSlide, setPause };
};