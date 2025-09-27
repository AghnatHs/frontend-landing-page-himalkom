import { useEffect, useCallback, useState } from 'react';
import { useFetchData } from '@/hooks/useAPI';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MotionReveal from '@/components/common/MotionReveal';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

// Simple reusable modal for portfolio detail
const ModalPorto = ({ porto, baseUrl, onClose }) => {
  // Close on ESC
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    // Prevent background scroll
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = original;
    };
  }, [handleKey]);

  if (!porto) return null;

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label={`Detail portofolio ${porto.name}`}
      className='fixed inset-0 z-[100] flex items-center justify-center p-4'
    >
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in'
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className='relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in font-athiti'>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label='Tutup detail portofolio'
          className='absolute top-3 right-3 rounded-full p-2 bg-white shadow hover:bg-gray-100 transition'
        >
          <IoClose size={22} />
        </button>

        <div className='grid md:grid-cols-2 gap-0 max-h-[80vh] md:max-h-[70vh]'>
          {/* Image */}
          <div className='relative h-64 md:h-full group overflow-hidden'>
            <img
              src={`${baseUrl}/storage/${porto.image}`}
              alt={porto.name}
              className='w-full h-full object-cover md:object-cover transition-transform duration-700 group-hover:scale-105'
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/placeholder-image.png';
              }}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-50 pointer-events-none' />
            <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
              <h2 className='text-2xl font-semibold drop-shadow'>
                {porto.name}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className='flex flex-col p-6 overflow-y-auto custom-scrollbar'>
            {porto.author && (
              <p className='text-sm text-gray-500 mb-2'>
                Dibuat oleh <span className='font-bold'>{porto.author}</span>
              </p>
            )}
            {porto.description ? (
              <p className='text-gray-700 leading-relaxed whitespace-pre-line text-[15px] md:text-base'>
                {porto.description}
              </p>
            ) : (
              <p className='italic text-gray-400'>Tidak ada deskripsi.</p>
            )}

            {/* Actions */}
            <div className='mt-6 flex flex-wrap gap-3'>
              {porto.link && (
                <a
                  href={porto.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-dark text-white hover:bg-primary transition text-sm font-medium shadow'
                >
                  {porto.link.includes('github.com') ? (
                    <FaGithub size={16} />
                  ) : (
                    <FaExternalLinkAlt size={14} />
                  )}
                  <span>
                    {porto.link.includes('github.com')
                      ? 'Lihat di GitHub'
                      : 'Kunjungi Proyek'}
                  </span>
                </a>
              )}
              <button
                onClick={onClose}
                className='inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium bg-white hover:bg-gray-50 transition'
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortoKomun = ({ slug, baseUrl }) => {
  const [selectedPorto, setSelectedPorto] = useState(null);
  const { data, loading, error } = useFetchData(
    `communities/${slug}/portofolio`,
    baseUrl
  );

  const openModal = (porto) => setSelectedPorto(porto);
  const closeModal = () => setSelectedPorto(null);

  if (loading) {
    return (
      <LoadingSpinner
        variant='section'
        size='medium'
        message='Memuat portofolio...'
      />
    );
  }

  if (error) {
    return (
      <p className='text-center text-red-500'>
        Gagal memuat portofolio. Silakan coba lagi nanti.
      </p>
    );
  }

  if (
    !data ||
    !data.communityPortofolios ||
    !Array.isArray(data.communityPortofolios) ||
    data.communityPortofolios.length === 0
  ) {
    return (
      <p className='text-center text-gray-500'>
        Belum ada portofolio untuk komunitas ini.
      </p>
    );
  }

  return (
    <MotionReveal animation='fade-up' delay={0.1}>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'>
          {data.communityPortofolios.map((porto) => (
            <div
              key={porto.id}
              role='button'
              tabIndex={0}
              onClick={() => openModal(porto)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal(porto);
                }
              }}
              className='bg-white rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark'
              aria-label={`Lihat detail portofolio ${porto.name}`}
            >
              {/* Image dengan link dan overlay */}
              <div className='w-full h-[220px] overflow-hidden relative group'>
                <img
                  src={`${baseUrl}/storage/${porto.image}`}
                  alt={porto.name}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder-image.png';
                  }}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end'>
                  <div className='p-4 w-full text-white'>
                    <h3 className='font-bold text-lg'>{porto.name}</h3>
                  </div>
                </div>
              </div>

              {/* Konten */}
              <div className='p-5 flex-1 flex flex-col'>
                <h3 className='font-bold text-lg mb-2 text-primary-dark group-hover:text-primary transition-colors'>
                  {porto.name}
                </h3>

                {porto.description && (
                  <p className='text-sm text-gray-600 mb-4 line-clamp-3 flex-1'>
                    {porto.description}
                  </p>
                )}

                {porto.author && (
                  <div className='flex items-center text-xs text-gray-500 mb-4'>
                    <span className='font-medium mr-1'>Oleh:</span>{' '}
                    {porto.author}
                  </div>
                )}

                {/* Actions di bagian bawah */}
                {porto.link && (
                  <div className='mt-auto pt-3 border-t border-gray-100 flex justify-end'>
                    <a
                      href={porto.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 text-sm font-medium text-primary-dark hover:text-primary transition'
                      aria-label={`Buka tautan proyek ${porto.name}`}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      {porto.link.includes('github.com') ? (
                        <>
                          <FaGithub size={16} />
                          <span>GitHub</span>
                        </>
                      ) : (
                        <>
                          <FaExternalLinkAlt size={14} />
                          <span>Lihat Proyek</span>
                        </>
                      )}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPorto && (
        <ModalPorto
          porto={selectedPorto}
          baseUrl={baseUrl}
          onClose={closeModal}
        />
      )}
    </MotionReveal>
  );
};

export default PortoKomun;
