import React, { useState } from 'react';
import ScrollReveal from '@/components/common/ScrollReveal';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

/**
 * Section untuk menampilkan program kerja departemen
 */
const ProkerSection = ({ proker }) => {
    // Handle jika proker tidak ada atau kosong
    if (!proker || (Array.isArray(proker) && proker.length === 0)) {
        return <div className="text-center py-8 text-gray-500">Program kerja belum tersedia</div>;
    }

    const [expandedItems, setExpandedItems] = useState({});
    const toggleItem = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    }

    // Custom ScrollReveal options 
	     const scrollRevealOptions = {
        threshold: 0.2,         
        rootMargin: "-100px 0px",  
        triggerOnce: false       
    };

    return (
        <ScrollReveal 
            animation="fade-up" 
            options={scrollRevealOptions}
            delay={300}  
        >
            <div className="flex flex-col bg-white p-6 md:p-4 rounded-2xl shadow-card w-full max-w-6xl mx-auto">
                {proker.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="flex flex-col p-4 w-full hover:bg-primary rounded-2xl transition duration-200 ease-in-out" onClick={() => toggleItem(index)}>
                            <div className='flex justify-between items-center w-full'> 	
                                <h2 className="text-lg font-normal">{item.name}</h2>
                                <button>
                                    {expandedItems[index] ? (
                                        <FiChevronUp className="text-primary-darker" size={24} />
                                    ) : (
                                        <FiChevronDown className='text-primary-darker' size={24} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Description dengan animasi yang lebih smooth */}
                        <div
                            id={`description-${index}`}
                            className={`overflow-hidden bg-primary-light rounded-2xl transition-all duration-500 ease-in-out
                                ${expandedItems[index] 
                                    ? 'max-h-96 opacity-100 p-4 mt-2' 
                                    : 'max-h-0 opacity-0 p-0 mt-0'}`}
                        >
                            <div className="py-1.5">
                                <p className="text-base">{item.description || 'Tidak ada deskripsi tersedia'}</p>
                            </div>
                        </div>

                        {/* Separator line*/}
                        {index < proker.length - 1 && (
                            <div className="h-px w-full bg-gray-200 my-1"></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </ScrollReveal>
    );
};

export default ProkerSection;