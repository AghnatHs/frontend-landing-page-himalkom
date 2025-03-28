import React from 'react';
import useInView from '@/hooks/useInView';

/**
 * ScrollReveal - Komponen untuk menampilkan elemen hanya saat discroll
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - Elemen yang akan di-reveal
 * @param {string} props.animation - Kelas animasi yang digunakan (default: 'fade-up')
 * @param {number} props.delay - Waktu delay setelah masuk viewport (ms)
 * @param {number} props.duration - Durasi animasi (ms)
 * @param {Object} props.options - Opsi untuk Intersection Observer
 */
const ScrollReveal = ({ 
  children, 
  animation = 'fade-up',
  delay = 0, 
  duration = 700,
  className = '',
  options = {},
  ...props 
}) => {
  const [ref, isInView] = useInView(options);
  
  // Pre-defined animations
  const animations = {
    'fade-up': 'opacity-0 translate-y-10',
    'fade-down': 'opacity-0 -translate-y-10',
    'fade-left': 'opacity-0 translate-x-10',
    'fade-right': 'opacity-0 -translate-x-10',
    'zoom-in': 'opacity-0 scale-95',
    'zoom-out': 'opacity-0 scale-105',
  };
  
  const initialClass = animations[animation] || animations['fade-up'];
  
  return (
    <div
      ref={ref}
      className={`transition-all transform ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'none' : undefined,
      }}
      {...props}
    >
      {isInView ? children : <div className={initialClass} style={{ height: '100%', width: '100%' }}></div>}
    </div>
  );
};

export default ScrollReveal;