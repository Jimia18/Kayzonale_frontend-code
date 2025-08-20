import React from "react";

const FilterSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
}) => {
  return (
    <div className="filter-sidebar p-3">
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

      {/* Price Filter Example */}
      <div className="mt-4">
        <h6>Price Range</h6>
        <input
          type="range"
          min={0}
          max={1000000}
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
        />
        <div>Max: UGX {priceRange[1].toLocaleString()}</div>
      </div>
    </div>
  );
};

export default FilterSidebar;
