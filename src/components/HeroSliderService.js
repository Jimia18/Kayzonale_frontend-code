import React, { useEffect, useState } from 'react';
import '../styles/HeroSlider.css';

const HeroSliderService = ({ onQuoteClick }) => {
  const images = [
    { src: '/images/IMG-20250724-WA0051.jpg'},
    { src: '/images/printer.jpg'},
    { src: '/images/IMG-20250724-WA0019.jpg' }, // you can add more images here
  ];

  const caption = 'Our services';
  const subCaption1 = 'From bold banners to business cards, we deliver reliable, creative print and design solutions for individuals, startups, and enterprises alike. Let your brand speak louder—professionally and affordably';
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
      className="bg-dark text-white text-center py-5"
      style={{
        backgroundImage: `url(${images[currentImage].src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        
        position: 'relative',
        transition: 'background-image 1s ease-in-out',
        zIndex: 1,
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute"
        style={{
          top: 0,
          left: 0,
          background: 'rgba(39, 79, 237, 1)',
          zIndex: 2,
        }}
      ></div>

      {/* Content */}
      <div
        className="position-relative text-white text-center "
        style={{ zIndex: 2, maxWidth: '900px', paddingLeft:'15rem' }}
      >
        <h1 className="fw-bold" style={{ fontSize: '4rem' }}>
          {caption}
        </h1>
        <p style={{ fontSize: '1.5rem' }} className="text-white ">
          {subCaption1}
        </p>
        <p style={{ fontSize: '1rem' }} className="text-white fst-italic">
          {subCaption2}
        </p>
       
      </div>
    </section>
  );
};

export default HeroSliderService;
