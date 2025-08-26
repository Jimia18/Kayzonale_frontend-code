import React, { useEffect, useState } from 'react';
import { useCart } from '../components/cartContext';
import HeroSlider from '../components/HeroSlider';
import axios from 'axios';
import '../styles/featuredProducts.css';
import '../styles/sectionHeader.css';

const hardcodedProducts = [
  { id: 3, title: 'Double-Sided Roller Banners', price: 190000, category: 'Large Format Printing', img: '/images/double_roller.jpg' },
  { id: 4, title: 'Teardrop Banners', price: 235000, category: 'Large Format Printing', img: '/images/teardrop_banner.jpg' },
  //{ id: 5, title: 'Rectangle Flag Banners', price: 235000, category: 'Specialty & Seasonal', img: '/images/rectangle_flag.jpg' },
  //{ id: 9, title: 'Glossy Business Cards', price: 24500, category: 'Branding & Stationery', img: '/images/glossy_cards.jpg' },
  { id: 10, title: 'Square Business Cards', price: 20000, category: 'Branding & Stationery', img: '/images/business card.jpg' },
  { id: 11, title: 'Self-Inked Stamps', price: 85000, category: 'Printing & Embroidery', img: '/images/stamps.jpg' },
  //{ id: 12, title: 'Customized Paper Bags', price: 6000, category: 'Paper & Promotional Products', img: '/images/paper_bag.jpg' },
];

const categories = [
  'All',
  'Large Format Printing',
  'Printing & Embroidery',
  'Branding & Stationery',
  'Paper & Promotional Products',
  'Specialty & Seasonal',
];

const ProductsPage = () => {
  const [dynamicProducts, setDynamicProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_BASE_URL}/api/v1/products/public`);
        const products = res.data.map(p => ({
          id: p.id,
          title: p.title,
          price: p.price,
          category: p.category,
          img: p.image ? `${API_BASE_URL}/${p.image.replace(/^\/+/, '')}` : '/images/pathto.jpg'
        }));
        setDynamicProducts(products);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const allProducts = [...hardcodedProducts, ...dynamicProducts];

  const filteredProducts = activeCategory === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <>
      <HeroSlider />
      <section className="py-5 bg-light">
        <div className="container">
          <div className="section-header text-center py-2">
            <h1 className="main-heading heading-underline">
              PRINTING MADE <span className="text-primary"> Easy for you</span>
            </h1>
            <p className="subheading" style={{ fontSize: '1.5rem' }}>Products</p>
          </div>

          {/* Category Tabs */}
          <div className="category-tabs mt-3 mb-4">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : (
            <div className="row g-4 mt-2">
              {filteredProducts.map(product => (
                <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                  <div className="card h-100 shadow product-card">
                    <img
                      src={product.img}
                      className="card-img-top"
                      alt={product.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => (e.target.src = '/images/pathto.jpg')}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text fw-bold">UGX {product.price.toLocaleString()}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="btn btn-primary btn-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
