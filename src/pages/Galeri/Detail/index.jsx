import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchData } from '@/hooks/useAPI';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MotionReveal from '@/components/common/MotionReveal';
import TImages from '@/utils/images';
import ReadMoreButton from '@/components/common/ReadMore'; // Tambahkan import ini
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaUserFriends, FaCode, FaCalendarAlt } from 'react-icons/fa';

/**
 * Project Card Component for similar projects
 */
const ProjectCard = ({ project, baseUrl }) => (
  <div className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-all hover:translate-y-[-5px]">
    {/* Image with overlay */}
    <Link to={`/galeri/${project.id}`}>
      <div className="relative w-full h-[180px] overflow-hidden">
        <img 
          src={`${baseUrl}/storage/${project.image}`}
          alt={project.name}
          loading="lazy"
          className="w-full h-full object-cover" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/placeholder-project.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
          <p className="text-white p-3 font-medium">{project.name}</p>
        </div>
      </div>
    </Link>
    
    {/* Content */}
    <div className="p-4">
      <Link to={`/galeri/${project.id}`}>
        <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors">{project.name}</h3>
      </Link>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">Angkatan {project.angkatan}</span>
        {/* ReadMoreButton */}
        <ReadMoreButton to={`/galeri/${project.id}`} />
      </div>
    </div>
  </div>
);

/**
 * Gallery Detail Component
 * 
 * Displays detailed information about a single gallery project
 * with similar projects section at the bottom
 * 
 * @returns {JSX.Element}
 */
const GalleryDetail = () => {
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [project, setProject] = useState(null);
  const [similarProjects, setSimilarProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch all gallery data
  const { 
    data: galleriesData, 
    loading: loadingGalleries, 
    error: errorGalleries 
  } = useFetchData('igalleries', baseUrl);
  
  // Extract the current project and similar projects from gallery data
  useEffect(() => {
    if (galleriesData?.igalleries) {
      setLoading(true);
      
      // Search through all subjects to find the project with matching ID
      let foundProject = null;
      let projectSubject = null;
      
      for (const subject of galleriesData.igalleries) {
        const project = subject.i_galleries.find(gallery => gallery.id === parseInt(id));
        if (project) {
          foundProject = {
            ...project,
            subjectName: subject.name,
            subjectId: subject.id
          };
          projectSubject = subject;
          break;
        }
      }
      
      if (foundProject) {
        setProject(foundProject);
        setError(null);
        
        // Get similar projects from same subject
        if (projectSubject) {
          const similar = projectSubject.i_galleries
            .filter(gallery => gallery.id !== parseInt(id))
            .map(gallery => ({
              ...gallery,
              subjectName: projectSubject.name,
              subjectId: projectSubject.id
            }))
            .slice(0, 3); // Get up to 3 similar projects
          
          setSimilarProjects(similar);
        }
      } else {
        setError('Proyek tidak ditemukan');
      }
      
      setLoading(false);
    }
  }, [galleriesData, id]);
  
  // Handle loading and error states
  if (loadingGalleries || loading) {
    return <LoadingSpinner variant="page" size="medium" message="Memuat data proyek..." />;
  }
  
  if (errorGalleries || error) {
    return (
      <div className="mt-32 mb-32 max-w-6xl mx-auto px-4">
        <div className="bg-red-50 text-red-500 p-8 rounded-lg text-center">
          <p className="text-lg font-semibold">Error: {errorGalleries || error}</p>
          <Link to="/galeri" className="mt-4 inline-block text-primary hover:underline">
            &larr; Kembali ke galeri
          </Link>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="mt-32 mb-32 max-w-6xl mx-auto px-4">
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-lg text-gray-500">Proyek tidak ditemukan</p>
          <Link to="/galeri" className="mt-4 inline-block text-primary hover:underline">
            &larr; Kembali ke galeri
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <section className="mt-32 mb-64 max-w-6xl mx-auto px-4 ">
        {/* Back button */}
        <MotionReveal animation="fade-up">
          <Link 
            to="/galeri" 
            className="inline-flex items-center gap-2 text-primary-darker bg-white py-1 px-2 rounded-4xl hover:opacity-70 transition mb-6"
          >
            <FaArrowLeft />
            <span>Kembali ke galeri</span>
          </Link>
        </MotionReveal>
        
        {/* Project header */}
        <MotionReveal animation="fade-up" delay={0.1}>
          <div className="bg-white shadow-card rounded-2xl overflow-hidden">
            {/* Project image */}
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
              <img 
                src={`${baseUrl}/storage/${project.image}`}
                alt={project.name}
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover', imageRendering: 'auto' }}
                loading="eager"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/placeholder-project.jpg';
                }}
              />
              
              {/* Subject badge */}
              <div className="absolute top-4 right-4 bg-white shadow-card rounded-lg px-3 py-2">
                <span className="font-medium text-primary-dark">
                  {project.subjectName}
                </span>
              </div>
            </div>
            
            {/* Project title and basic info */}
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {project.name}
              </h1>
              
                            <div className="mb-6">
                <img
                  src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
                  alt="Divider"
                  className="h-[12px] w-[200px] md:w-[280px]"
                  style={{ imageRendering: 'auto', objectFit: 'cover' }}
                />
              </div>
              
              {/* Info badges */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCalendarAlt className="text-primary" />
                  <span>Angkatan {project.angkatan}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUserFriends className="text-primary" />
                  <span>Kontributor: {project.contributor}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-700">
                  <FaCode className="text-primary" />
                  <span>Mata Kuliah: {project.subjectName}</span>
                </div>
              </div>
              
              {/* Project description */}
              <div className="prose max-w-none mt-4">
                <h2 className="text-xl font-semibold mb-3">Deskripsi Proyek</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.description}
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
        
        {/* Project links */}
        {project.link && (
          <MotionReveal animation="fade-up" delay={0.2}>
            <div className="mt-8 bg-white shadow-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Link Proyek</h2>
              <div className="flex flex-wrap gap-4">
                {project.link.includes('github.com') ? (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <FaGithub size={20} />
                    <span>Lihat di GitHub</span>
                  </a>
                ) : (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <FaExternalLinkAlt size={16} />
                    <span>Kunjungi Website Proyek</span>
                  </a>
                )}
              </div>
            </div>
          </MotionReveal>
        )}
        
        {/* Similar Projects Section */}
        {similarProjects.length > 0 && (
          <MotionReveal animation="fade-up" delay={0.3}>
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-2">Projek Sejenis</h2>
              <div className="flex justify-start mb-6">
                <img
                  src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
                  alt="Divider"
                  className="h-[12px] w-[200px]"
                  style={{ imageRendering: 'auto', objectFit: 'cover' }}
                />
              </div>
              <p className="text-gray-600 mb-8">
                Projek lain dari mata kuliah {project.subjectName}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProjects.map(similarProject => (
                  <ProjectCard 
                    key={`similar-${similarProject.id}`}
                    project={similarProject}
                    baseUrl={baseUrl}
                  />
                ))}
              </div>
            </div>
          </MotionReveal>
        )}
        
        {/* No similar projects message */}
        {similarProjects.length === 0 && (
          <MotionReveal animation="fade-up" delay={0.3}>
            <div className="mt-16 p-6 bg-gray-50 rounded-xl text-center">
              <h2 className="text-xl font-semibold mb-2">Tidak Ada Projek Sejenis</h2>
              <p className="text-gray-600">
                Belum ada projek lain dari mata kuliah {project.subjectName}
              </p>
            </div>
          </MotionReveal>
        )}
      </section>
    </div>
  );
};

export default GalleryDetail;