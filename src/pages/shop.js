import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Spinner, Pagination, Alert, Button } from 'react-bootstrap';
import { FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '../components/productCard';
import FilterSidebar from '../components/FilterSideBar';
import { useCart } from '../components/cartContext';
import productsData from '../components/Products'; // ✅ local fallback

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const productsPerPage = 9;

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/v1/products/');
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          // If API returns no data, use fallback
          setProducts(productsData);
        }
        setLoading(false);
      } catch (err) {
        console.warn("API fetch failed, using local products...");
        setProducts(productsData);
        setError('Showing offline product data');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        selectedCategory === 'All' ? true : product.category === selectedCategory
      )
      .filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((product) => {
        const price = parseFloat(product.price || 0);
        return price >= priceRange[0] && price <= priceRange[1];
      })
      .sort((a, b) => {
        if (sortOption === 'priceLow') return a.price - b.price;
        if (sortOption === 'priceHigh') return b.price - a.price;
        if (sortOption === 'nameAsc') return a.title.localeCompare(b.title);
        if (sortOption === 'nameDesc') return b.title.localeCompare(a.title);
        return 0;
      });
  }, [products, selectedCategory, search, priceRange, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  return (
    <Container fluid className="p-1">
      <h2 className="fw-bold mb-4 text-center mt-5">All Products</h2>
      <Row>
        <Col md={3}>
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />
        </Col>

        <Col md={9}>
          <div className="d-flex justify-content-between mb-4">
            <Form.Control
              type="text"
              placeholder="Search products..."
              style={{ width: '300px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="d-flex align-items-center">
              <Form.Select
                className="me-3"
                style={{ width: '180px' }}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="nameAsc">Name: A-Z</option>
                <option value="nameDesc">Name: Z-A</option>
              </Form.Select>

              <Button 
                variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'} 
                className="me-2"
                onClick={() => setViewMode('grid')}
              >
                <FiGrid />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'primary' : 'outline-secondary'}
                onClick={() => setViewMode('list')}
              >
                <FiList />
              </Button>
            </div>
          </div>

          {loading && (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {error && <Alert variant="warning">{error}</Alert>}

          <Row xs={1} sm={2} md={viewMode === 'grid' ? 3 : 1} className="g-4">
            {paginatedProducts.map((product) => (
              <Col key={product.id}>
                <ProductCard 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  viewMode={viewMode}
                />
              </Col>
            ))}
          </Row>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              </Pagination>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ShopPage;
