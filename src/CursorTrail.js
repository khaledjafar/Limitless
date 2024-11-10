import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CursorTrail = () => {
  const cursorRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY,
      });

      
      gsap.to(cursorRef.current, {
        x: cursorPosition.x - 25, 
        y: cursorPosition.y - 25, 
        duration: 0.3,
        ease: "power4.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorPosition]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "absolute",
        inset:0,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "#5C47C2",
        pointerEvents: "none", 
        transformOrigin: "center",
        zIndex: 9999,
      }}
    />
  );
};

export default CursorTrail;
