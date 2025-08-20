import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Spinner,
  Pagination,
  Alert,
  Button,
} from "react-bootstrap";
import { FiGrid, FiList } from "react-icons/fi";
import ProductCard from "../components/productCard";
import FilterSidebar from "../components/FilterSideBar";
import { useCart } from "../components/cartContext";
import productsData from "../components/Products"; // fallback if API fails
import api from "../api"; // your Axios instance

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");

  const productsPerPage = 9;
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products/");
        // Defensive: Expect response data to have data property with products array
        const fetchedProducts =
          Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.data?.products)
            ? res.data.data.products
            : [];

        setProducts(fetchedProducts);
        setError("");
      } catch (e) {
        console.warn("API fetch failed, using fallback.", e);
        setProducts(productsData || []);
        setError("Showing offline product data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toPrice = (p) => {
    const n =
      typeof p === "number" ? p : parseFloat(String(p).replace(/[, ]/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      maximumFractionDigits: 0,
    }).format(toPrice(price));

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) =>
        selectedCategory === "All"
          ? true
          : (p.category || "").toLowerCase() === selectedCategory.toLowerCase()
      )
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

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleAddToCart = (product) => addToCart(product);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))],
    [products]
  );

  return (
    <Container fluid className="p-1">
      <h2 className="fw-bold mb-4 text-center mt-5">All Products</h2>

      <Row>
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

        <Col md={9}>
          {/* Top Bar: Search, Sort, View Toggle */}
          <div className="d-flex justify-content-between mb-4 flex-wrap">
            <Form.Control
              type="text"
              placeholder="Search products..."
              style={{ width: 300, minWidth: "100%" }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            <div className="d-flex align-items-center mt-2 mt-md-0">
              <Form.Select
                className="me-3"
                style={{ width: 200 }}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="nameAsc">Name: A–Z</option>
                <option value="nameDesc">Name: Z–A</option>
              </Form.Select>

              <Button
                variant={viewMode === "grid" ? "primary" : "outline-secondary"}
                className="me-2"
                onClick={() => setViewMode("grid")}
              >
                <FiGrid />
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "outline-secondary"}
                onClick={() => setViewMode("list")}
              >
                <FiList />
              </Button>
            </div>
          </div>

          {/* Loading, Error, or Product List */}
          {loading ? (
            <div className="text-center">
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
                  <ProductCard
                    product={{
                      ...product,
                      image: product.image
                        ? product.image.startsWith("http")
                          ? product.image
                          : `http://localhost:5000/uploads/products/${product.image}`
                        : "/images/business card.jpg",
                      formattedPrice: formatPrice(product.price),
                    }}
                    AddToCart={handleAddToCart}
                    viewMode={viewMode}
                  />
                </Col>
              ))}
            </Row>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
