import React, { useRef, useEffect } from 'react';
import './styles.css';

const InfiniteSlider = () => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scrollers = scrollerRef.current ? [scrollerRef.current] : [];

    // If a user hasn't opted in for reduced motion, then we add the animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        // Add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", true);

        // Make an array from the elements within `.scroller__inner`
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // Add aria-hidden to it
        // Add it into the `.scroller__inner`
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  return (
    

    
    <div className="scroller" data-speed="slow" ref={scrollerRef}>
      <ul className="tag-list scroller__inner">
        <li>HTML</li>
        <li>CSS</li>
        <li>JS</li>
        <li>GSAP</li>
        <li>SwiperJS</li>
        <li>React-Three-Drei</li>
        <li>Animation</li>
        <li>UI/UX</li>
        <li>React</li>
        <li>THREEJS</li>
        <li>React-Three-Fiber</li>
        <li>Frontend-Dev</li>
        <li>WebGL</li>
        <li>JQuery</li>
        <li>Bootstrap</li>
        <li>SweetAlert2</li>
        <li>ModelRender</li>

      </ul>
    </div>
  );
};

export default InfiniteSlider;
