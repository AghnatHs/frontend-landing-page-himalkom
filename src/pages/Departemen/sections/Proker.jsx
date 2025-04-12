import React, { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import MotionReveal from '@/components/common/MotionReveal';

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

    return (
        <MotionReveal animation="fade-up" delay={0.3}>
            <div className="flex flex-col bg-white p-6 md:p-4 rounded-2xl shadow-card w-full max-w-6xl mx-auto">
                {proker.map((item, index) => (
                    <React.Fragment key={index}>
                        {/* Accordion header */}
                        <div 
                            className={`py-3 px-2 flex justify-between items-center cursor-pointer rounded-[7px] hover:bg-primary ${expandedItems[index] ? 'bg-primary' : ''}`}
                            onClick={() => toggleItem(index)}
                        >
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <span className={`transform transition-transform ${expandedItems[index] ? 'rotate-180' : ''}`}>
                                <FaAngleDown />
                            </span>
                        </div>
                        
                        {/* Accordion content */}
                        <div 
                            className={`transition-all duration-300 overflow-hidden rounded-[7px] ${
                                expandedItems[index] ? 'max-h-96 opacity-100 hover:bg-[#CFEFF4]' : 'max-h-0 opacity-0'
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
        </MotionReveal>
    );
};

export default ProkerSection;