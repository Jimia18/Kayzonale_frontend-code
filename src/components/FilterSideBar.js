import React from "react";
import { Range } from "react-range";

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

      {/* Dual Slider for Price Range */}
      <div className="mt-4">
        <h6>Price Range</h6>
        <Range
          step={1000}
          min={0}
          max={1000000}
          values={priceRange}
          onChange={(values) => onPriceChange(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                background: `linear-gradient(to right, #ddd ${
                  (priceRange[0] / 1000000) * 100
                }%, #007bff ${(priceRange[0] / 1000000) * 100}%, #007bff ${
                  (priceRange[1] / 1000000) * 100
                }%, #ddd ${(priceRange[1] / 1000000) * 100}%)`,
                borderRadius: "4px",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                backgroundColor: "#007bff",
                border: "2px solid white",
                boxShadow: "0 0 5px rgba(0,0,0,0.3)",
              }}
            />
          )}
        />
        <div className="mt-2">
          Min: UGX {priceRange[0].toLocaleString()} <br />
          Max: UGX {priceRange[1].toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
