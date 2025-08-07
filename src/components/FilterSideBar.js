// src/components/FilterSidebar.jsx
import React from "react";
import { Form } from "react-bootstrap";

const FilterSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
}) => (
  <div>
    <h5>Category</h5>
    <Form.Select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </Form.Select>

    <h5 className="mt-4">Price Range</h5>
    <Form.Range
      min={0}
      max={100000}
      step={500}
      value={priceRange}
      onChange={(e) => onPriceChange(Number(e.target.value))}
    />
    <div>Max: UGX {priceRange.toLocaleString()}</div>
  </div>
);

export default FilterSidebar;
