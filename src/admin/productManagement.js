import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://localhost:5000/api/v1/products";

  // Get token from localStorage
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).access_token
    : null;

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data.products || []);
      } else {
        setError("Failed to load products");
      }
    } catch (err) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Open modal for creating a new product
  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      price: "",
      image: null,
    });
    setError(null);
    setSuccess(null);
    setShowModal(true);
  };

  // Open modal for editing an existing product
  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || "",
      description: product.description || "",
      category: product.category || "",
      price: product.price !== null && product.price !== undefined ? product.price.toString() : "",
      image: null,
    });
    setError(null);
    setSuccess(null);
    setShowModal(true);
  };

  // Submit form handler for create/update
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  // Validation (unchanged)
  if (!formData.title.trim() || !formData.description.trim() || !formData.category.trim()) {
    setError("Title, description, and category are required.");
    return;
  }

  // Prepare FormData
  const formPayload = new FormData();
  formPayload.append("title", formData.title.trim());
  formPayload.append("description", formData.description.trim());
  formPayload.append("category", formData.category.trim());
  formPayload.append("price", formData.price || "");
  if (formData.image) {
    formPayload.append("image", formData.image);
  }

  try {
    const url = editingProduct
      ? `${API_BASE}/edit/${editingProduct.id}`
      : `${API_BASE}/create`;
    const method = editingProduct ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formPayload,
    });

    // Parse response safely
    let data;
    try {
      data = await res.json();
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError);
      setError("Received invalid response from server");
      return;
    }

    // Handle non-2xx responses
    if (!res.ok) {
      // Extract detailed error message
      let errorMessage = "Failed to save product";
      
      if (data.error) {
        errorMessage = data.error;
      }
      
      if (data.details) {
        // Format validation errors
        const detailMessages = Object.entries(data.details)
          .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
          .join('; ');
        errorMessage += ` - ${detailMessages}`;
      }
      
      setError(errorMessage);
    } else {
      // Success handling
      setSuccess(editingProduct ? "Product updated successfully." : "Product created successfully.");
      setShowModal(false);
      fetchProducts();
    }
  } catch (err) {
    console.error("Network error:", err);
    setError("Network error. Please check your connection and try again.");
  }
};
  // Delete product handler
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_BASE}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to delete product.");
      } else {
        setSuccess("Product deleted successfully.");
        fetchProducts();
      }
    } catch (err) {
      setError("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="container my-4">
      <h1>Product Management</h1>

      <Button variant="primary" className="mb-3" onClick={openCreateModal}>
        Add New Product
      </Button>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="row">
          {products.length === 0 && <p>No products found.</p>}
          {products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={
                    product.image
                      ? `http://localhost:5000/static/uploads/products/${product.image}`
                      : "/images/business card.jpg"
                  }
                  alt={product.title}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/business card.jpg";
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p>{product.description}</p>
                  <p>Category: {product.category}</p>
                  <p>Price: {product.price ?? "N/A"}</p>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => openEditModal(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Create/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? "Edit Product" : "Create Product"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category *</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Image {editingProduct ? "(leave empty to keep current)" : "*"}</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {editingProduct ? "Update Product" : "Create Product"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
