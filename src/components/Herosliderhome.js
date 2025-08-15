import React, { useEffect, useState } from 'react';
import '../styles/HeroSlider.css'; // Ensure .hero-fade CSS has fade animation

const HeroSlider = ({ onQuoteClick }) => {
  const images = [
    {
      src: '/images/modern-printing.jpg',
      caption: 'Kayzonale Designs and General Enterprises',
      subCaption1: 'Quality Print and Design made Affordable',
      subCaption2: 'Patronize With Us Today',
    },
    {
      src: '/images/modern-manufacturing-equipment-futuristic-factory-generated-by-ai.jpg',
      caption: 'Creative Branding Services',
      subCaption1: 'Expert designs to grow your brand',
      subCaption2: 'Your brand, our passion',
    },
    {
      src: '/images/IMG-20250724-WA0041.jpg',
      caption: 'Professional Print Solutions',
      subCaption1: 'Bold, high-resolution prints',
      subCaption2: 'Make your message stand out',
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000); // change image every 3 seconds for better readability

    return () => clearInterval(interval);
  }, [images.length]);

  const current = images[currentImage];

  return (
    <section
      aria-label="Hero image slider"
      className="w-100 text-white d-flex align-items-center justify-content-center hero-fade pt-2"
      style={{
        backgroundImage: `url(${current.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '18%',
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
      />

      {/* Content */}
      <div
        className="position-relative text-white text-center px-3"
        style={{ zIndex: 3, maxWidth: '900px' }}
      >
        <h1 className="fw-bold" style={{ fontSize: '4rem' }}>
          {current.caption}
        </h1>
        <p style={{ fontSize: '2rem' }} className="mb-1 text-white">
          {current.subCaption1}
        </p>
        <p style={{ fontSize: '1.5rem' }} className="mb-3 fst-italic text-white">
          {current.subCaption2}
        </p>
        <button
          onClick={onQuoteClick}
          className="btn btn-danger rounded-pill fw-bold"
          style={{ fontSize: '1.5rem', padding: '1rem 3rem' }}
        >
          Get a Quote
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;