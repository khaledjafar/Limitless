import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedPointer = () => {
  const pointerRef = useRef(null);

  useEffect(() => {
    gsap.to(pointerRef.current, {
      y: -10,                
      duration: 0.6,        
      yoyo: true,            
      repeat: -1,            
      ease: "power1.inOut", 
    });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div 
        ref={pointerRef} 
        style={{
          fontSize: '1.2rem',
          color: '#fff'

        }}
      >
        Check Out My Latest Work <br /><br /><i class='bx bx-down-arrow-alt'></i> {/*👇 */}
      </div>
    </div>
  );
};

export default AnimatedPointer;
