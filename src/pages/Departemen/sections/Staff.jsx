import React, { useState, useRef } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import ScrollReveal from '@/components/common/ScrollReveal';

const StaffCard = ({ staff, baseUrl, className, delay = 400 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  React.useEffect(() => {
    // Delay untuk animasi bertahap dari kiri ke kanan
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const imageUrl = staff.image
    ? `${baseUrl}/storage/${staff.image}`
    : 'https://placehold.co/200/primary-dark/white?text=No+Photo';

  return (
    <div 
      ref={cardRef}
      className={`flex flex-col items-center text-center bg-white shadow-md rounded-lg mt-6 p-6 border border-primary-light transform transition-all duration-700 
        ${isVisible ? `opacity-100 ${className}` : 'opacity-0 translate-y-10'}`}
    >
      <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-primary-dark">
        <img
          src={imageUrl}
          alt={staff.name || 'Staff member'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/200/primary-dark/white?text=No+Photo';
            e.target.onerror = null;
          }}
        />
      </div>
      <h3 className="mt-4 font-semibold text-lg md:text-xl">{staff.jabatan || 'Staff'}</h3>
      <p className="text-primary-darker text-sm md:text-base">{staff.name || 'Unnamed'}</p>
    </div>
  );
};

const StaffSection = ({ staff }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (!staff || staff.length === 0) {
    return <p className="text-center text-gray-500 text-xl">No staff data available.</p>;
  }

  // Temukan ketua dan pisahkan dari anggota lain
  const ketua = staff.find(member => member.isKetua === 1);
  const regularStaff = staff.filter(member => member.isKetua !== 1);
  
  // Susun ulang staff agar ketua di posisi indeks 1 (baris 1 kolom 2)
  const arrangedStaff = [];
  
  // Jika ada minimal 1 anggota biasa, tempatkan di posisi 0
  if (regularStaff.length > 0) {
    arrangedStaff.push(regularStaff[0]);
  } else {
    // Jika tidak ada anggota biasa, buat placeholder kosong
    arrangedStaff.push({ id: 'placeholder-0', name: '', jabatan: '', image: '' });
  }
  
  // Tempatkan ketua di posisi 1 (jika ada)
  if (ketua) {
    arrangedStaff.push(ketua);
  }
  
  // Tambahkan sisa anggota biasa
  if (regularStaff.length > 1) {
    arrangedStaff.push(...regularStaff.slice(1));
  }
  
  const getCardPositionClass = (index) => {
    const column = index % 3;
    
    if (column === 1) { // Kolom tengah (kolom 2)
      if (index === 1) {
        return '-translate-y-20'; // Baris 1 kolom 2 NAIK
      } else if (index === 4 || index === 7) {
        return 'translate-y-20'; // Baris 2 & 3 kolom 2 TURUN
      }
    }
    return '';
  };

  return (
    <ScrollReveal animation="fade-up" options={{ threshold: 0.2 }}>
      <div className="flex flex-col items-center max-w-6xl mx-auto py-12">
        <SectionHeader title="STAFF" altText="Garis Staff" />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-8 gap-y-16 justify-items-center w-full">
          {arrangedStaff.map((member, index) => (
            member.id === 'placeholder-0' ? (
              <div key="placeholder" className="invisible" />
            ) : (
              <StaffCard 
                key={member.id} 
                staff={member} 
                baseUrl={baseUrl}
                className={getCardPositionClass(index)}
                delay={index * 400} // Delay bertahap untuk efek cascade
              />
            )
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default StaffSection;