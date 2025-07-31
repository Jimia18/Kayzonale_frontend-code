import React, { useEffect, useState } from 'react';
import '../styles/HeroSlider.css';

const HeroSliderPortfolio = () => {
  const images = [
    { src: '/images/IMG-20250724-WA0023.jpg'},
    { src: '/images/IMG-20250724-WA0021.jpg.jpg'},
    { src: '/images/IMG-20250724-WA0022.jpg' }, // you can add more images here
  ];

  const caption = 'Our Portfolio';
  const subCaption1 = 'Take a look at some of our completed branding and print projects.';
  const subCaption2 = 'Your brand, our passion';

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      className="w-100 text-white d-flex align-items-center justify-content-center hero-fade"
      style={{
        backgroundImage: `url(${images[currentImage].src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        paddingTop:'0rem',
        paddingBottom:'0rem',
        height: '100vh',
        position: 'relative',
        transition: 'background-image 1s ease-in-out',
        zIndex: 1,
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.37)',
          zIndex: 2,
        }}
      ></div>

      {/* Content */}
      <div
        className="position-relative text-white text-center px-3"
        style={{ zIndex: 3, maxWidth: '900px' }}
      >
        <h1 className="fw-bold" style={{ fontSize: '4rem' }}>
          {caption}
        </h1>
        <p style={{ fontSize: '2rem' }} className="text-white mb-1">
          {subCaption1}
        </p>
        <p style={{ fontSize: '1.5rem' }} className="mb-3 text-white fst-italic">
          {subCaption2}
        </p>
       
      </div>
    </section>
  );
};

export default HeroSliderPortfolio;
