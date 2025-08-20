import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Spinner, Alert } from "react-bootstrap";

const DashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock_quantity: "",
    image: null,
  });

  const getToken = () => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      return user?.access_token || null;
    }
    return null;
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const res = await axios.get("http://localhost:5000/api/v1/products/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data.data.products || []);
    } catch (err) {
      setError("Error loading products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      stock_quantity: "",
      image: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const token = getToken();
    const productData = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
        productData.append(key, val ?? "");
    });

    try {
      await axios.post("http://localhost:5000/api/v1/products/create", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMsg("Product created successfully!");
      setShowCreateModal(false);
      resetForm();
      fetchProducts();
    } catch (err) {
      setError("Failed to create product.");
    }
  };

  const openEditModal = (product) => {
    setEditProductId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      stock_quantity: product.stock_quantity,
      image: null,
    });
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const token = getToken();
    const productData = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) productData.append(key, val);
    });

    try {
      await axios.put(`http://localhost:5000/api/v1/products/edit/${editProductId}`,
 
        productData,
        {
          headers: { Authorization: `Bearer ${token}`, 
          "Content-Type": "multipart/form-data",},
        }
      );

      setSuccessMsg("Product updated successfully!");
      setShowEditModal(false);
      resetForm();
      fetchProducts();
    } catch (err) {
      setError("Failed to update product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    const token = getToken();
    try {
     await axios.delete(`http://localhost:5000/api/v1/products/delete/${id}`, {
     headers: { Authorization: `Bearer ${token}` },
      });


      setSuccessMsg("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  const renderForm = () => (
    <>
      <Form.Group className="mb-2">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Stock Quantity</Form.Label>
        <Form.Control
          name="stock_quantity"
          type="number"
          value={formData.stock_quantity}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Price</Form.Label>
        <Form.Control
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Image</Form.Label>
        <Form.Control
          name="image"
          type="file"
          accept="image/*"
          onChange={handleInputChange}
        />
      </Form.Group>
    </>
  );

  return (
    <div className="container mt-5">
      <h2>Dashboard - Products</h2>

      {loading && (
        <div className="my-3 text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Button className="my-3" onClick={() => setShowCreateModal(true)}>
        Add Product
      </Button>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={`http://localhost:5000/uploads/products/${product.image}`}
                alt={product.name}
                className="card-img-top"
                style={{ objectFit: "cover", height: "200px" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/posho2.jpg";
                }}
              />

              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p>{product.description}</p>
                <p>Stock: {product.stock_quantity}</p>
                <p>Price: {product.price ?? "N/A"}</p>
                <Button variant="warning" size="sm" onClick={() => openEditModal(product)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateProduct}>
          <Modal.Body>{renderForm()}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateProduct}>
          <Modal.Body>{renderForm()}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Update
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardProducts;