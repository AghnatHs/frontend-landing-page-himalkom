import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";

const ReadMoreButton = ({ 
  to, 
  label = "Selengkapnya", 
}) => {
  return (
    <div className='rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 p-1'>
      <Link 
        to={to}
        className="flex items-center justify-between w-full transition-all duration-300 px-2 py-1 group"
      >
        <span className="text-sm font-medium text-primary-darker group-hover:text-primary-dark transition-colors duration-300">
          {label}
        </span>
        <div className="bg-primary p-0.5 rounded flex items-center justify-center transition-all duration-300 group-hover:bg-primary-dark group-hover:transform group-hover:translate-x-1">
          <FaAngleRight 
            size={16} 
            className="text-primary-darker transition-all duration-300" 
          />
        </div>
      </Link>
    </div>
  );
};

export default ReadMoreButton;