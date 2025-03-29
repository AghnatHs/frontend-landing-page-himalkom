import React, { useState } from 'react';
import ScrollReveal from '@/components/common/ScrollReveal';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

/**
 * Program Kerja Section Component
 * Displays work programs of a department in an accordion format
 * 
 * @param {Object} props
 * @param {Array} props.proker - Work programs data
 * @returns {JSX.Element}
 */
const ProkerSection = ({ proker }) => {
    // Handle if proker is empty or null
    if (!proker || (Array.isArray(proker) && proker.length === 0)) {
        return <div className="text-center py-8 text-gray-500">Program kerja belum tersedia</div>;
    }

    // State for tracking expanded accordion items
    const [expandedItems, setExpandedItems] = useState({});
    
    // Toggle accordion item expansion
    const toggleItem = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    }

    // Animation options for scroll reveal
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
                        {/* Accordion header */}
                        <div 
                            className="flex flex-col p-4 w-full hover:bg-primary rounded-2xl transition duration-200 ease-in-out" 
                            onClick={() => toggleItem(index)}
                        >
                            <div className='flex justify-between items-center w-full'> 	
                                <h2 className="text-lg font-normal">{item.name}</h2>
                                <button aria-label={expandedItems[index] ? "Collapse" : "Expand"}>
                                    {expandedItems[index] ? (
                                        <FiChevronUp className="text-primary-darker" size={24} />
                                    ) : (
                                        <FiChevronDown className='text-primary-darker' size={24} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Accordion content with smooth animation */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="p-4 text-gray-700">
                                <p>{item.description || 'Tidak ada deskripsi'}</p>
                            </div>
                        </div>
                        
                        {/* Divider except for last item */}
                        {index < proker.length - 1 && (
                            <hr className="border-gray-200 my-1" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </ScrollReveal>
    );
};

export default ProkerSection;