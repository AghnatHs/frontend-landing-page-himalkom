import React from 'react';
import ReadMoreButton from '@/components/common/ReadMore';
import LoadingSpinner from '@/components/common/LoadingSpinner';

/**
 * MegaprokerCard Component
 * 
 * Menampilkan informasi untuk satu program kerja utama dalam bentuk card
 * dengan logo dan navigasi ke halaman detail
 * 
 * @param {Object} props
 * @param {Object} props.megaproker - Data megaproker dari API
 * @param {string} props.megaproker.name - Nama megaproker
 * @param {string} props.megaproker.logo - Path ke logo megaproker
 * @param {string} props.megaproker.slug - Slug untuk navigasi
 * @param {string} props.baseUrl - URL dasar API untuk assets
 * @returns {JSX.Element}
 */
const MegaprokerCard = ({ megaproker, baseUrl }) => (
  <div
    className="w-full max-w-[557px] h-[274px] rounded-[15px] bg-white shadow-card flex items-center justify-evenly p-8"
  >
    {/* Logo megaproker - container dengan ukuran tetap */}
    <div className="flex justify-center items-center h-full w-2/5">
      <img
        src={`${baseUrl}/storage/${megaproker.logo}`}
        alt={megaproker.name}
        className="max-w-full max-h-44 object-contain"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/placeholder-logo.jpg';
        }}
      />
    </div>
    
    {/* Informasi dan tombol navigasi */}
    <div className='flex flex-col items-center justify-center gap-4 h-full w-3/5'>
      <h3 className="font-bold text-xl md:text-2xl text-center">{megaproker.name}</h3>
      <ReadMoreButton to={`/megaproker/`} />
    </div>
  </div>
);

/**
 * Megaproker Section Component
 * 
 * Menampilkan daftar program kerja utama HIMALKOM
 * dalam layout grid responsif dengan 1 kolom (mobile) atau 2 kolom (desktop)
 * 
 * @param {Object} props
 * @param {Object} props.megaprokerData - Data megaproker dari API
 * @param {Array} props.megaprokerData.megaprokers - Daftar megaproker
 * @param {boolean} props.loadingMegaproker - Status loading data
 * @param {string|null} props.errorMegaproker - Pesan error jika ada
 * @param {string} props.baseUrl - URL dasar API untuk assets
 * @returns {JSX.Element|null}
 */
const Megaproker = ({ megaprokerData, loadingMegaproker, errorMegaproker, baseUrl }) => {
  // Handle loading state
  if (loadingMegaproker) {
    return <LoadingSpinner variant="section" message="Memuat megaproker..." />;
  }
  
  // Handle error state
  if (errorMegaproker) {
    return <p className="text-red-500 font-bold text-xl text-center">Error: {errorMegaproker}</p>;
  }
  
  // Handle empty data
  if (!megaprokerData?.megaprokers || megaprokerData.megaprokers.length === 0) {
    return <p className="text-center text-gray-500 my-8">Tidak ada data megaproker</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-18 justify-items-center mx-auto max-w-6xl py-8">
      {megaprokerData.megaprokers.map((megaproker) => (
        <MegaprokerCard 
          key={megaproker.id || `megaproker-${megaproker.slug}`} 
          megaproker={megaproker} 
          baseUrl={baseUrl} 
        />
      ))}
    </div>
  );
};

export default Megaproker;