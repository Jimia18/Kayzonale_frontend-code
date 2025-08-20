// src/components/SectionHeader.jsx
import React from 'react';
import './sectionHeader.css'; // Make sure this file exists

const categories = [
  'All',
  'Business Cards Uganda',
  'Campaign posters printing',
  'Print Advertising & Office',
  'Signs, Banners & Posters',
];

const SectionHeader = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="section-header py-5 position-relative text-center ">
      <p className="subheading">PRINTING MADE EASY IN UGANDA</p>
      <h2 className="main-heading mb-4">
        Featured <span className='text-primary'>Products</span>
        </h2>

      <div className="category-tabs mt-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab ${
              activeCategory === category ? 'active' : ''
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionHeader;
