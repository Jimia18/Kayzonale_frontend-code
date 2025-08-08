import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/featuredProducts.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/v1/products');
        setProducts(res.data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Extract unique categories from products
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filtered + limited products
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const loadMore = () => setVisibleCount(prev => prev + 4);

  return (
    <section className="featured-section py-5 text-center">
      <div className="container">
        <h6 className="text-uppercase mb-4 fst-italic">
          <span className="text-pink">Quality print and </span>
          <span className="fw-bold heading-underline">Design Made</span>
          <span className="text-dark"> Affordable</span>
        </h6>

        {/* Categories */}
        <div className="d-flex justify-content-center flex-wrap mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-link text-dark me-3 mb-2 ${selectedCategory === cat ? 'fw-bold border-bottom border-dark' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              style={{ textDecoration: 'none' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && <Spinner animation="border" />}

        {/* Product Cards */}
        <div className="row justify-content-center">
          {visibleProducts.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
              <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                <div className="card h-100 interactive-card shadow-sm">
                  <img
                    src={`/images/${product.image}`}
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text small">{product.description?.slice(0, 60)}...</p>
                    <p className="fw-bold text-success">UGX {product.price.toLocaleString()}</p>
                    <Button variant="outline-dark" size="sm">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Load More */}
        {!loading && visibleCount < filteredProducts.length && (
          <div className="mt-4">
            <Button variant="dark" onClick={loadMore}>
              Load More
            </Button>
          </div>
        )}

        {/* View All Link */}
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
