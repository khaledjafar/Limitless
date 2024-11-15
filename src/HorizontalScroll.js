import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const galleryRef = useRef(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    const galleryWidth = gallery.offsetWidth;
    const amountToScroll = galleryWidth - window.innerWidth;

    // Horizontal scroll animation with GSAP
    gsap.to(gallery, {
      x: -amountToScroll, // Move gallery to the left by the calculated scroll distance
      ease: 'none',
      scrollTrigger: {
        trigger: '.gallery-wrapper', // Element triggering the scroll animation
        start: 'top 30px', // Start when the top reaches 30px from the viewport
        end: `+=${amountToScroll}`, // End after scrolling the calculated amount
        pin: true, // Pin the gallery in place during the scroll
        scrub: true, // Smoothly scroll the animation
      },
    });

    // Individual image animations
    const images = gallery.querySelectorAll('.gallery-image');
    images.forEach((image) => {
      gsap.from(image, {
        scale: 0.8, // Start with smaller scale
        opacity: 0, // Start fully transparent
        y: 50, // Start slightly below its final position
        duration: 1, // Animation duration
        scrollTrigger: {
          trigger: image, // Trigger each image animation individually
          start: 'right 120%', // Start animation when right edge reaches 120% of viewport
          toggleActions: 'play none none reverse', // Reverse animation on scroll back up
        },
      });
    });

    // Lenis smooth scroll setup
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup ScrollTrigger instances when component unmounts
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      <div className="gallery-wrapper">
        <div className="gallery" ref={galleryRef}>

          {/* Project Content */}
          <div className='gallery-content' style={{ marginLeft: '6rem' }}>
            <img className='gallery-image' src="./images/advsProject.jpg" alt="Project Logo" />
            <a className='project-link-text' href='https://advs.test.jo/' target="_blank" rel="noopener noreferrer">Advs.jo</a>
            <p className='project-description'>Unified Government Advertising Platform. I was the Frontend developer in Ministry of Digital Economy and Entrepreneurship.</p>
          </div>

          <div className='gallery-content'>
            <img className='gallery-image' src="./images/Portfolio.jpg" alt="Project Logo" />
            <a className='project-link-text' href='https://portfolio-khaledjafars-projects.vercel.app' target="_blank" rel="noopener noreferrer">3D-Website</a>
            <p className='project-description'>This is my first attempt at creating a portfolio, where I showcase some of the skills and designs I've developed as a frontend developer.</p>
          </div>

          <div className='gallery-content' style={{ marginRight: '6rem' }}>
            <img className='gallery-image' src="./images/NearMeProject.jpg" alt="Project Logo" />
            <a className='project-link-text' href='https://youtu.be/fGzMhksNn6g' target="_blank" rel="noopener noreferrer">NearMe</a>
            <p className='project-description'>This app is designed to help cars experiencing trouble on the road by connecting users with a reliable vehicle repair service on the road, This was my gradution project and i work on it as a frontend dev.</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default HeroSection;
