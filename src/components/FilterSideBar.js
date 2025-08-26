import React, { useState, useEffect } from "react";
//import "./filterSidebar.css"; // optional for extra styles

const FilterSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
}) => {
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);

  useEffect(() => {
    onPriceChange([minPrice, maxPrice]);
  }, [minPrice, maxPrice, onPriceChange]);

  return (
    <div className="filter-sidebar p-3 border rounded shadow-sm">
      {/* Categories */}
      <h5 className="mb-3">Categories</h5>
      <select
        className="form-select mb-4"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <div className="mt-4">
        <h6>Price Range</h6>
        <div className="d-flex gap-2 mb-2">
          <input
            type="number"
            className="form-control"
            style={{ width: "45%" }}
            value={minPrice}
            min={0}
            max={maxPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="number"
            className="form-control"
            style={{ width: "45%" }}
            value={maxPrice}
            min={minPrice}
            max={1000000}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <input
          type="range"
          min={0}
          max={1000000}
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="form-range mb-2"
        />
        <input
          type="range"
          min={0}
          max={1000000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="form-range"
        />

        <div className="mt-1 text-muted">
          UGX {minPrice.toLocaleString()} – UGX {maxPrice.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
