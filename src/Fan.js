import React from 'https://esm.sh/react@18.3.1';
import fanImage from "../public/images/fan.png";
import gsap from 'https://cdn.skypack.dev/gsap'; // Ensure correct import
import { useGSAP } from 'https://cdn.skypack.dev/@gsap/react'; // GSAP React Hook

function Fan() {
  const { contextSafe } = useGSAP(); // Use the GSAP hook
  
  const onEnter = contextSafe(({ currentTarget }) => {
    gsap.to(currentTarget, { rotation: "+=360", duration: 1 });
  });

  return (
    <div className="fan-container">
      <img
        src={fanImage}
        onClick={onEnter} // Click to trigger animation
        alt="Fan"
        className="fan-image"
      />
    </div>
  );
}

export default Fan;
