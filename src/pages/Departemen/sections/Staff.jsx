import React from 'react';

const StaffCard = ({ staff, isLeader }) => {
  return (
    <div className={`flex flex-col items-center ${isLeader ? 'mb-12' : ''}`}>
      <div className={`relative rounded-full border-4 ${isLeader ? 'border-purple-500' : 'border-purple-300'} overflow-hidden`}>
        <img 
          src={staff.photo} 
          alt={staff.name || 'Staff member'} 
          className={`object-cover ${isLeader ? 'w-48 h-48' : 'w-36 h-36'}`} 
          onError={(e) => {
            e.target.src = 'https://placehold.co/200/purple/white?text=No+Photo'; 
            e.target.onerror = null;
          }}
        />
      </div>
      <h3 className={`mt-3 font-bold ${isLeader ? 'text-xl' : 'text-lg'}`}>{staff.name || 'Unnamed'}</h3>
      <p className="text-purple-700">{staff.position || 'Staff'}</p>
    </div>
  );
};

const StaffSection = ({ staff }) => {
  if (!staff || !Array.isArray(staff) || staff.length === 0) {
    return <p className="text-center text-gray-500 text-xl">Belum ada data staf tersedia.</p>;
  }

  // Pisahkan ketua (leader) dan anggota biasa dengan pengecekan untuk undefined
  const leader = staff.find(member => 
    member.position && (
      member.position.toLowerCase().includes('ketua') || 
      member.position.toLowerCase().includes('kepala') ||
      member.position.toLowerCase().includes('head')
    )
  );
  
  const members = leader ? staff.filter(member => member !== leader) : staff;

  // Tentukan berapa kolom yang dibutuhkan berdasarkan jumlah anggota
  let columns = 3;
  if (members.length <= 3) columns = 2;
  if (members.length >= 7) columns = 4;

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto">
      {/* Leader Section */}
      {leader && <StaffCard staff={leader} isLeader={true} />}

      {/* Members Section - gunakan grid-cols fixed untuk menghindari error templating */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-8`}>
        {members.map((member, index) => (
          <StaffCard key={index} staff={member} isLeader={false} />
        ))}
      </div>
    </div>
  );
};

export default StaffSection;