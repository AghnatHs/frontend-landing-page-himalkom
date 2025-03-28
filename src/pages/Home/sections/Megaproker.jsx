import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Card megaproker (komponen internal)
 */
const MegaprokerCard = ({ megaproker, baseUrl }) => (
  <div
    className="w-full max-w-[557px] h-[274px] rounded-[15px] bg-white shadow-card flex items-center justify-evenly p-8"
  >
    <div className="flex justify-center items-center h-full w-2/5">
      <img
        src={`${baseUrl}/storage/${megaproker.logo}`}
        alt={megaproker.name}
        className="max-w-full max-h-44 object-contain"
      />
    </div>
    <div className='flex flex-col items-center justify-center gap-4 h-full w-3/5'>
      <h3 className="font-bold text-xl md:text-2xl text-center">{megaproker.name}</h3>
      <Link to={`/megaproker/${megaproker.slug}`} className='px-4 py-2 text-sm rounded-sm bg-white shadow-[0px_0px_8px_0.3px_rgba(105,83,207,0.39)] cursor-pointer transition-all hover:shadow-[0px_0px_8px_2px_rgba(105,83,207,0.39)]'>
        Selengkapnya
      </Link>
    </div>
  </div>
);

/**
 * Section megaproker
 */
const Megaproker = ({ megaprokerData, loadingMegaproker, errorMegaproker, baseUrl }) => {
  if (loadingMegaproker) return <p className="text-center">Loading megaproker...</p>;
  if (errorMegaproker) return <p className="text-red-500 font-bold text-xl text-center">Error: {errorMegaproker}</p>;
  if (!megaprokerData || !megaprokerData.megaprokers) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-18 justify-items-center mx-auto max-w-6xl">
      {megaprokerData.megaprokers.map((megaproker) => (
        <MegaprokerCard 
          key={megaproker.id || megaproker.slug} 
          megaproker={megaproker} 
          baseUrl={baseUrl} 
        />
      ))}
    </div>
  );
};

export default Megaproker;