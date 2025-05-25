import { useFetchData } from '@/hooks/useAPI';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MotionReveal from '@/components/common/MotionReveal';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'; // Impor ikon

const PortoKomun = ({ slug, baseUrl }) => {
  const { data, loading, error } = useFetchData(`communities/${slug}/portofolio`, baseUrl);

  if (loading) {
    return <LoadingSpinner variant="section" size="medium" message="Memuat portofolio..." />;
  }

  if (error) {
    return <p className="text-center text-red-500">Gagal memuat portofolio. Silakan coba lagi nanti.</p>;
  }

  if (!data || !data.communityPortofolios || !Array.isArray(data.communityPortofolios) || data.communityPortofolios.length === 0) {
    return <p className="text-center text-gray-500">Belum ada portofolio untuk komunitas ini.</p>;
  }

  return (
    <MotionReveal animation="fade-up" delay={0.1}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {data.communityPortofolios.map(porto => (
            <div
              key={porto.id}
              className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] h-full flex flex-col"
            >
              {/* Image dengan link dan overlay */}
              <a href={porto.link || '#'} target="_blank" rel="noopener noreferrer" className="block">
                <div className="w-full h-[220px] overflow-hidden relative group">
                  <img
                    src={`${baseUrl}/storage/${porto.image}`}
                    alt={porto.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder-image.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full text-white">
                      <h3 className="font-bold text-lg">{porto.name}</h3>
                    </div>
                  </div>
                </div>
              </a>

              {/* Konten */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-2 text-primary-dark group-hover:text-primary transition-colors">
                  {porto.name}
                </h3>

                {porto.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                    {porto.description}
                  </p>
                )}

                {porto.author && (
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <span className="font-medium mr-1">Oleh:</span> {porto.author}
                  </div>
                )}

                {/* Actions di bagian bawah */}
                {porto.link && (
                  <div className="mt-auto pt-3 border-t border-gray-100 flex justify-end">
                    <a
                      href={porto.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-primary-dark hover:text-primary transition"
                      aria-label={`Lihat proyek ${porto.name}`}
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
    </MotionReveal>
  );
}

export default PortoKomun;