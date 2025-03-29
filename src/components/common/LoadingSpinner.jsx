import React from 'react';
import { HashLoader, PulseLoader, ClipLoader } from 'react-spinners';

/**
 * Komponen animasi loading yang bisa digunakan di seluruh aplikasi
 * @param {Object} props - Component props
 * @param {string} props.size - Ukuran spinner ('small', 'medium', 'large')
 * @param {string} props.variant - Jenis spinner ('page', 'section', 'inline')
 * @param {string} props.message - Pesan loading (opsional)
 */
const LoadingSpinner = ({ 
  size = 'medium',
  variant = 'section',
  message = 'Memuat data...',
  className = ''
}) => {
  // Ukuran spinner berdasarkan props size
  const spinnerSize = {
    small: 15,
    medium: 30, 
    large: 50
  };
  
  // Warna utama sesuai dengan tema website
  const color = '#7c3aed'; // Warna purple yang sesuai dengan desain

  // Render spinner yang berbeda berdasarkan variant
  const renderSpinner = () => {
    switch (variant) {
      case 'page':
        return <HashLoader color={color} size={spinnerSize[size]} />;
      case 'section':
        return <PulseLoader color={color} size={spinnerSize[size] / 2} />;
      case 'inline':
        return <ClipLoader color={color} size={spinnerSize[size]} />;
      default:
        return <PulseLoader color={color} size={spinnerSize[size] / 2} />;
    }
  };

  // Container classes berdasarkan variant
  const containerClass = {
    page: 'min-h-[50vh] flex items-center justify-center',
    section: 'py-16 flex items-center justify-center',
    inline: 'inline-flex items-center gap-3'
  };

  return (
    <div className={`${containerClass[variant]} ${className}`}>
      <div className="flex flex-col items-center">
        {renderSpinner()}
        {message && (
          <p className="mt-4 text-center text-gray-600 font-athiti text-xl">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;