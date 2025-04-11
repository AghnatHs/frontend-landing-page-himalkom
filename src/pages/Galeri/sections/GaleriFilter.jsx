import React from "react";

/**
 * Gallery Filter Component
 * 
 * @param {Object} props
 * @param {Array} props.subjects - Available subjects
 * @param {string|number} props.activeSubject - Currently active subject
 * @param {Function} props.setActiveSubject - Function to change active subject
 * @returns {JSX.Element}
 */
const GaleriFilter = ({ subjects, activeSubject, setActiveSubject }) => {
  if (!subjects || subjects.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Daftar Mata Kuliah</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {/* All subjects option */}
        <button
          onClick={() => setActiveSubject('all')}
          className={`px-3 py-2 shadow-card bg-white rounded-md cursor-pointer transition-colors
            ${activeSubject === 'all' 
              ? 'bg-primary-dark text-white font-medium' 
              : 'hover:bg-primary-light'
            }`}
        >
          Semua
        </button>

        {/* Dynamic subjects */}
        {subjects.map((subject) => (
          <button
            key={`subject-${subject.id}`}
            className={`px-3 py-2 shadow-card bg-white rounded-md cursor-pointer transition-colors
              ${activeSubject === subject.id || activeSubject === subject.name
                ? 'bg-primary-dark text-white font-medium' 
                : 'hover:bg-primary-light'
              }`}
            onClick={() => setActiveSubject(subject.id)}
          >
            {subject.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GaleriFilter;