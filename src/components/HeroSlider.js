


import React, { useState, useEffect } from 'react';
import '../styles/HeroSlider.css'; // Custom styles

const slides = [
  {
    id: 1,
    label: 'Bronchures',
    image: '/images/IMG-20250724-WA0021.jpg',
    caption: 'Company Bronchures',
    sub: 'We give your company a professional design',
    thumbnail: ' /images/IMG-20250724-WA0021.jpg',
  },
  {
    id: 2,
    label: 'Cardholders ',
    image: '/images/IMG-20250724-WA0016.jpg',
    caption: 'We offer you Durable and high Quality ',
    sub: 'Make your Company Stand out',
    thumbnail: '/images/IMG-20250724-WA0016.jpg',
  },
  {
    id: 3,
    label: 'Calendar Designs',
    image: '/images/calendar.jpg',
    caption: 'Creative Calendar Designs',
    sub: 'Stand out on the shelf',
    thumbnail: '/images/calendar.jpg',
  },

  {
    id: 4,
    label: 'Menu Designs',
    image: '/images/IMG-20250724-WA0015.jpg',
    caption: 'Creative Menu Designs',
    sub: 'Make your products stand out',
    thumbnail: '/images/IMG-20250724-WA0015.jpg',
  },

  {
    id: 5,
    label: 'Wedding Invitation Cards ',
    image: '/images/IMG-20250724-WA0025.jpg',
    caption: 'Creative Invitation Designs',
    sub: 'Make your Wedding stand out',
    thumbnail: '/images/IMG-20250724-WA0025.jpg',
  },
  

  // Add more items as needed
];  

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((next) => (next + 1) % slides.length);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSidebarClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="d-flex w-100 hero-slider pt-0">
      {/* Sidebar */}
      <div className="sidebar d-flex flex-column p-2">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => handleSidebarClick(index)}
            className={`sidebar-item d-flex align-items-center p-2 mb-2 ${
              activeIndex === index ? 'active' : ''
            }`}
          >
            <img
              src={slide.thumbnail}
              alt={slide.label}
              className="sidebar-icon me-2"
            />
            <div>
              <div className="branding-label">Branding</div>
              <div className="fw-bold">{slide.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Display */}
      <div className="flex-grow-1 position-relative overflow-hidden">
        <div className="slide-wrapper d-flex" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {slides.map((slide) => (
            <div
              className="slide w-100 position-relative text-white"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
              key={slide.id}
            >
              <div className="overlay" />
              <div className="slide-content text-start">
                <h1 className="fw-bold">{slide.caption}</h1>
                <p className="text-white">{slide.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
