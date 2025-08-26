import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Form, Spinner, Alert, Button, Pagination } from "react-bootstrap";
import { FiGrid, FiList } from "react-icons/fi";
import ProductCard from "../components/productCard";
import FilterSidebar from "../components/FilterSideBar";
import { useCart } from "../components/cartContext";
import axios from "axios";

const ShopPage = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");

  const productsPerPage = 9;

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
        const res = await axios.get(`${API_BASE_URL}/api/v1/products/public`);
        const data = res.data.map((p) => ({
          ...p,
          price: Number(p.price),
          image: p.image ? `${API_BASE_URL}/${p.image.replace(/^\/+/, "")}` : "/images/pathto.jpg"
        }));
        setProducts(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Dynamic categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return ["All", ...cats];
  }, [products]);

  // Price helper
  const toPrice = (p) => (typeof p === "number" ? p : parseFloat(String(p).replace(/[, ]/g, "")) || 0);

  // Filter + Sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => selectedCategory === "All" || (p.category || "").toLowerCase() === selectedCategory.toLowerCase())
      .filter((p) => (p.title || "").toLowerCase().includes(search.toLowerCase()))
      .filter((p) => {
        const price = toPrice(p.price);
        return price >= priceRange[0] && price <= priceRange[1];
      })
      .sort((a, b) => {
        if (sortOption === "priceLow") return toPrice(a.price) - toPrice(b.price);
        if (sortOption === "priceHigh") return toPrice(b.price) - toPrice(a.price);
        if (sortOption === "nameAsc") return (a.title || "").localeCompare(b.title || "");
        if (sortOption === "nameDesc") return (b.title || "").localeCompare(a.title || "");
        return 0;
      });
  }, [products, selectedCategory, search, priceRange, sortOption]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  return (
    <Container fluid className="p-3">
      <h2 className="fw-bold mb-4 text-center mt-4">All Products</h2>

      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            priceRange={priceRange}
            onPriceChange={(range) => {
              setPriceRange(range);
              setCurrentPage(1);
            }}
          />
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-3 gap-2">
            <Form.Control
              type="text"
              placeholder="Search products..."
              style={{ maxWidth: 300 }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            <div className="d-flex align-items-center gap-2">
              <Form.Select style={{ width: 200 }} value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="">Sort by</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="nameAsc">Name: A–Z</option>
                <option value="nameDesc">Name: Z–A</option>
              </Form.Select>

              <Button variant={viewMode === "grid" ? "primary" : "outline-secondary"} onClick={() => setViewMode("grid")}>
                <FiGrid />
              </Button>
              <Button variant={viewMode === "list" ? "primary" : "outline-secondary"} onClick={() => setViewMode("list")}>
                <FiList />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="warning">{error}</Alert>
          ) : paginatedProducts.length === 0 ? (
            <Alert variant="info">No products found.</Alert>
          ) : (
            <Row xs={1} sm={2} md={viewMode === "grid" ? 3 : 1} className="g-4">
              {paginatedProducts.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} viewMode={viewMode} addToCart={addToCart} />
                </Col>
              ))}
            </Row>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} />
              </Pagination>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ShopPage;
