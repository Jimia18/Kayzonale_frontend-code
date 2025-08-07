import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../styles/featuredProducts.css';
import { Link } from 'react-router-dom'; // Or <a href="/shop"> if not using React Router

const categories = [
  'All',
  'Business Cards Uganda',
  'Campaign posters printing',
  'Print Advertising & Office',
  'Signs, Banners & Posters',
];

const products = [
  {
    id: 1,
    title: 'Business Card Design',
    image: '/images/business card.jpg',
    category: 'Business Cards Uganda',
  },
  {
    id: 2,
    title: 'Receipts & Invoices',
    image: '/images/invoices receipts.jpg',
    category: 'Print Advertising & Office',
  },
  {
    id: 3,
    title: 'Embroidery',
    image: '/images/embroider.jpg',
    category: 'Embroidery & Branding',
  },
  {
    id: 4,
    title: 'Flyer Printing',
    image: '/images/flier.jpg',
    category: 'Print Advertising & Office',
  },
  // Add more products here
];

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section className="featured-section py-5 text-center">
      <div className="container">
        <h6 className="text-uppercase mb-2 fst-italic animate__slideInLeft">
  <span className="text-pink">Quality print and</span>{' '}
  <span className="fw-bold d-inline-block position-relative heading-underline mb-0" style={{ marginRight: '0.5rem' }}>
    Design Made
  </span>
  <span className="text-dark">Affordable</span>
</h6>


        {/* Filter Tabs */}
        <div className="d-flex justify-content-center flex-wrap mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-link text-dark me-3 mb-2 ${
                selectedCategory === cat ? 'fw-bold border-bottom border-dark' : ''
              }`}
              onClick={() => setSelectedCategory(cat)}
              style={{ textDecoration: 'none' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="row justify-content-center ">
          {filteredProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card h-100 interactive-card shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-4">
          <Link to="/shop">
            <Button variant="outline-dark" className="px-4 py-2 fw-bold rounded-pill">
              View All
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
