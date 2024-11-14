import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedPointer = () => {
  const pointerRef = useRef(null);

  useEffect(() => {
    gsap.to(pointerRef.current, {
      y: -10,                // Move up 10 pixels
      duration: 0.6,         // Animation duration
      yoyo: true,            // Reverses the animation (up and down)
      repeat: -1,            // Infinite repeat
      ease: "power1.inOut",  // Smooth easing
    });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div 
        ref={pointerRef} 
        style={{
          fontSize: '1rem',

        }}
      >
        {/* 👆  <br /> */}Check Out My Latest Work <br />👇
      </div>
    </div>
  );
};

export default AnimatedPointer;
