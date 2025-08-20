import React, { useState, useEffect } from 'react';
import '../styles/HeroSliderProducts.css';

const slides = [
  { id: 1, label: 'Bronchures', image: '/images/IMG-20250724-WA0021.jpg', caption: 'Company Bronchures', sub: 'We give your company a professional design', thumbnail: '/images/IMG-20250724-WA0021.jpg' },
  { id: 2, label: 'Cardholders', image: '/images/IMG-20250724-WA0016.jpg', caption: 'We offer you Durable and high Quality', sub: 'Make your Company Stand out', thumbnail: '/images/IMG-20250724-WA0016.jpg' },
  { id: 3, label: 'Calendar Designs', image: '/images/calendar.jpg', caption: 'Creative Calendar Designs', sub: 'Stand out on the shelf', thumbnail: '/images/calendar.jpg' },
  { id: 4, label: 'Menu Designs', image: '/images/IMG-20250724-WA0015.jpg', caption: 'Creative Menu Designs', sub: 'Make your products stand out', thumbnail: '/images/IMG-20250724-WA0015.jpg' },
  { id: 5, label: 'Wedding Invitation Cards', image: '/images/IMG-20250724-WA0025.jpg', caption: 'Creative Invitation Designs', sub: 'Make your Wedding stand out', thumbnail: '/images/IMG-20250724-WA0025.jpg' },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleThumbnailClick = (index) => setActiveIndex(index);

  return (
    <div className="hero-slider d-flex flex-column flex-md-row w-100">
      {/* Sidebar / Thumbnails */}
      <div className="sidebar d-flex flex-row flex-md-column p-2 overflow-auto">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => handleThumbnailClick(index)}
            className={`sidebar-item d-flex align-items-center p-2 m-1 ${activeIndex === index ? 'active' : ''}`}
          >
            <img src={slide.thumbnail} alt={slide.label} className="sidebar-icon me-2" />
            <div className="d-none d-md-block">
              <div className="branding-label">Branding</div>
              <div className="fw-bold">{slide.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Slides */}
      <div className="slide-container flex-grow-1 overflow-hidden position-relative">
        <div
          className="slide-wrapper d-flex transition-slide"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="slide w-100 position-relative text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="overlay" />
              <div className="slide-content text-start p-4">
                <h1 className="fw-bold">{slide.caption}</h1>
                <p className='text-white'>{slide.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
