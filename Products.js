import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import Footer from "../components/Footer";
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [requestDetails, setRequestDetails] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).access_token : null;

    setIsLoading(true);
    setFetchError(null);

    axios.get('http://localhost:5000/api/v1/products/', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    .then(res => {
      const backendProducts = (res.data?.data?.products || []).map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        image: p.image
          ? `http://localhost:5000/uploads/products/${p.image}`
          : '/images/posho2.jpg',
        price: p.price,
        stock_quantity: p.stock_quantity,
      }));
      setProducts(backendProducts);
    })
    .catch(err => {
      console.error('Failed to fetch products:', err);
      setFetchError('Failed to load products. Please try again later.');
      setProducts([]);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleOpenRequestModal = (product) => {
    setSelectedProduct(product);
    setShowRequestModal(true);
  };

  const handleCloseRequestModal = () => {
    if (isSubmitting) return; // Prevent closing while submitting
    setShowRequestModal(false);
    setRequestDetails({ name: '', email: '', phone: '', message: '' });
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("No product selected.");
      return;
    }

    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).access_token : null;

    setIsSubmitting(true);

    try {
      await axios.post(
        'http://localhost:5000/api/v1/inquiries/',
        {
          product_id: selectedProduct.id,
          name: requestDetails.name,
          email: requestDetails.email,
          phone: requestDetails.phone,
          message: requestDetails.message
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );

      alert("Your inquiry has been sent! We'll get back to you soon.");
      setShowRequestModal(false);
      setRequestDetails({ name: '', email: '', phone: '', message: '' });

    } catch (err) {
      alert("There was a problem sending your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container mt-5 product-page">
        <h2 className="product-title">Our Products</h2>

        <section className="product-excellence">
          <h3>Product Excellence</h3>
          <p>
            Our flagship product, <strong>Shamba Maize Flour</strong>, is celebrated for its fine,
            white texture and is fast becoming a trusted brand across Eastern Uganda and beyond.
            Available in multiple sizes to serve both household and commercial needs.
          </p>
          <ul>
            <li>Shamba Maize Meal: 2kg, 5kg (ideal for breakfast ugali with smooth texture)</li>
            <li>Shamba Maize Flour: 5kg, 10kg, 25kg, 50kg (bulk packaging for wider distribution)</li>
          </ul>
        </section>

        <div className="mb-4 text-center">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>

        {isLoading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" />
          </div>
        ) : fetchError ? (
          <div className="alert alert-danger text-center">{fetchError}</div>
        ) : (
          <div className="row product-grid">
            {products
              .filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
              )
              .map(product => (
                <div key={product.id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <button
                        className="btn btn-success mt-auto"
                        onClick={() => handleOpenRequestModal(product)}
                      >
                        Ask About This Product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <Modal show={showRequestModal} onHide={handleCloseRequestModal} centered>
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Request Quote for {selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRequestSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={requestDetails.name}
                onChange={(e) => setRequestDetails({ ...requestDetails, name: e.target.value })}
                disabled={isSubmitting}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={requestDetails.email}
                onChange={(e) => setRequestDetails({ ...requestDetails, email: e.target.value })}
                disabled={isSubmitting}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={requestDetails.phone}
                onChange={(e) => setRequestDetails({ ...requestDetails, phone: e.target.value })}
                disabled={isSubmitting}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={requestDetails.message}
                onChange={(e) => setRequestDetails({ ...requestDetails, message: e.target.value })}
                disabled={isSubmitting}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> Sending...
                </>
              ) : (
                'Submit Request'
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
};

export default Products;
