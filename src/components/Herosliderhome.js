import React, { useEffect, useState } from 'react';
import '../styles/HeroSlider.css';

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
  const [animateText, setAnimateText] = useState('slide-in');

  useEffect(() => {
    const interval = setInterval(() => {
      // Start sliding out
      setAnimateText('slide-out');

      setTimeout(() => {
        // Switch to next image and slide in
        setCurrentImage((prev) => (prev + 1) % images.length);
        setAnimateText('slide-in');
      }, 1000); // match animation duration
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const current = images[currentImage];

  return (
    <section
      style={{
        backgroundImage: `url(${current.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
        position: 'relative',
        transition: 'background-image 1s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.37)',
        }}
      />

      {/* Text content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white', maxWidth: '900px', padding: '0 1rem' }}>
        <h1 className={`hero-text ${animateText}`} style={{ fontSize: '4rem', fontWeight: 'bold' }}>
          {current.caption}
        </h1>
        <p className={`hero-text ${animateText}`} style={{ fontSize: '2rem',color: 'white', margin: '0.5rem 0' }}>
          {current.subCaption1}
        </p>
        <p className={`hero-text ${animateText}`} style={{ fontSize: '1.5rem',color: 'white', fontStyle: 'italic', marginBottom: '1rem' }}>
          {current.subCaption2}
        </p>
        <button
          className={`hero-text btn btn-danger rounded-pill hero-text ${animateText}`}
          onClick={onQuoteClick}
          style={{ fontSize: '1.5rem', padding: '1rem 3rem', borderRadius: '50px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
        >
          Get a Quote
        </button>
      </div>
    </section>
  );
};

export default HeroSlider;
