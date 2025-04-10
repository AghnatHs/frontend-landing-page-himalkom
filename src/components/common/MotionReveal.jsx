import React from 'react';
import { motion } from 'framer-motion';

/**
 * MotionReveal - Simple component for revealing elements with smooth animations
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - Elements to animate
 * @param {string} props.animation - Animation preset ('fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom')
 * @param {number} props.delay - Delay before animation starts (in seconds)
 * @param {number} props.duration - Animation duration (in seconds)
 * @param {string} props.className - Additional CSS classes
 */
const MotionReveal = ({ 
  children, 
  animation = 'fade-up',
  delay = 0, 
  duration = 0.5,
  className = '',
  ...props 
}) => {
  // Pre-defined animation variants
  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-down': {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-left': {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    },
    'fade-right': {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 }
    },
    'zoom': {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 }
    }
  };

  const selectedVariant = variants[animation] || variants['fade-up'];
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px 0px" }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut" 
      }}
      variants={selectedVariant}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionReveal;