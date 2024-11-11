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

    // GSAP animation for horizontal scroll
    gsap.to(gallery, {
      x: -amountToScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: '.gallery-wrapper',
        start: 'top 30px',
        end: `+=${amountToScroll}`,
        pin: true,
        scrub: true,
      },
    });

    // GSAP animations for images
    const images = gallery.querySelectorAll('.gallery-image');
    images.forEach((image, index) => {
      gsap.from(image, {
        scale: 0.8,
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: image,
          start: 'right 120%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Lenis scroll smoothness
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      <div className="gallery-wrapper">
        <div className="gallery" ref={galleryRef}>

          <div className='gallery-content'>
            <img className='gallery-image' src="./images/advsProject.jpg" alt="Project Logo" />
            <a className='project-link-text' href='https://advs.test.jo/' target="_blank" rel="noopener noreferrer">Advs.jo</a>
            <p className='project-description'>Unified Government Advertising Platform I was the Frontend developer in Ministry of Digital Economy and Entrepreneurship</p>
          </div>

          <div className='gallery-content'>
            <img className='gallery-image' src="./images/Portfolio.jpg" alt="Project Logo" />
            <a className='project-link-text' href='https://portfolio-khaledjafars-projects.vercel.app' target="_blank" rel="noopener noreferrer">My Portfolio</a>
            <p className='project-description'>First portfolio that i made.</p>
          </div>

        

          <div className='gallery-content'>
            <img className='gallery-image' src="./images/NearMeProject.jpg" alt="Project Logo" />
            <a className='project-link-text' href='https://youtu.be/fGzMhksNn6g' target="_blank" rel="noopener noreferrer">NearMe</a>
            <p className='project-description'>This app is designed to help cars experiencing trouble on the road by connecting users with a reliable vehicle repair service.</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default HeroSection;
