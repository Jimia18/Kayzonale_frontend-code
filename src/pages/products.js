import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // For reading URL query
import '../styles/Products.css';
import HeroSlider from '../components/HeroSlider';
import FeaturedProducts from '../components/FeaturedProducts';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const location = useLocation();

  // Helper to get query params
  const getQueryParams = (search) => {
    return new URLSearchParams(search);
  };

  const queryParams = getQueryParams(location.search);
  const initialCategory = queryParams.get('category') || '';

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      const storedUser = localStorage.getItem('user');
      const token = storedUser ? JSON.parse(storedUser).access_token : null;

      try {
        const res = await axios.get('http://localhost:5000/api/v1/products/', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        if (isMounted) {
          const backendProducts = (res.data?.data?.products || []).map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            image: p.image
              ? `http://localhost:5000/uploads/products/${p.image}`
              : '/images/business card.jpg',
            price: p.price,
            category: p.category || 'Uncategorized',
          }));

          setProducts(backendProducts);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        if (isMounted) {
          setFetchError('Failed to load products. Please try again later.');
          setProducts([]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProducts();
    return () => { isMounted = false; };
  }, []);

  // Filter by search and URL category
  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = initialCategory
      ? product.category.toLowerCase() === initialCategory.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <HeroSlider />

    

      <div className="container my-5 product-page">
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Products</h2>
          <p className="text-muted fs-5">
            Browse our premium selection of products tailored to meet your household or business needs.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-4 text-center">
          <input
            type="text"
            className="form-control search-input w-50 mx-auto"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <FeaturedProducts hideHeader={true} />

        {/* Product Grid */}
        {isLoading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : fetchError && products.length === 0 ? (
          <div className="alert alert-danger text-center">{fetchError}</div>
        ) : filteredProducts.length > 0 ? (
          <div className="row g-4 justify-content-center">
            {filteredProducts.map(product => (
              <div key={product.id} className="col-md-4 col-sm-6">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="card-img-top mx-auto mt-4"
                    style={{ height: '150px', width: 'auto', objectFit: 'contain' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{product.title}</h5>
                    <p className="text-muted">{product.description}</p>
                    <p className="text-secondary mb-1">
                      <strong>Category:</strong> {product.category}
                    </p>
                    <p className="text-primary fw-semibold">Price: UGX {product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted">No products found.</div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
