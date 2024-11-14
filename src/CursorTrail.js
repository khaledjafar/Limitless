import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './styles.css'; // Optional: add styles here

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    const handleMouseMove = (event) => {
      gsap.to(cursor, {
        x: event.clientX - 15,
        y: event.clientY - 15,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    // Attach mouse event
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up event listener
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;
