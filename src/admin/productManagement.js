import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Pagination,
} from "react-bootstrap";
import DashboardLayout from "./dashboardLayout";
import AdminSidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/v1/products";

const DashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const isMobile = window.innerWidth <= 768;
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: null,
  });

  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, pages: 1 });

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const fetchProducts = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}?page=${pageNum}&limit=10`);
      setProducts(res.data.data.products);
      setMeta(res.data.data.meta);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        image: null,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        image: null,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
  try {
    setLoading(true);
    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "")
        fd.append(key, formData[key]);
    });

    const headers = { Authorization: `Bearer ${token}` };

    

    if (editingProduct) {
      // Update product
      await axios.put(`${API_URL}/edit/${editingProduct.id}`, fd, { headers });
      toast.success("Product updated successfully");
    } else {
      // Create product
      await axios.post(`${API_URL}/create`, fd, { headers });
      toast.success("Product created successfully");

      // Go to first page so new product is visible
      setPage(1);
      await fetchProducts(1);
    }

    handleCloseModal();
  } catch (err) {
    console.error(err);
    toast.error(
      err.response?.data?.error || "Failed to save product"
    );
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${API_URL}/delete/${id}`, { headers });
      toast.success("Product deleted successfully");
      fetchProducts(page);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  return (
   <DashboardLayout
         title="Products"
         description="Add,edit and deleteYour Products"
         sidebarOpen={sidebarOpen}
         setSidebarOpen={setSidebarOpen}
         isMobile={isMobile}
         SidebarComponent={AdminSidebar}
       >
      <div className="p-6">
          <Button variant="primary" onClick={() => handleOpenModal()}>
            + Add Product
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      {p.image ? (
                        <img
                          src={p.image ? `${API_URL.replace('/api/v1/products','')}/static/uploads/products/${p.image}` : '/placeholder.jpg'}
                          alt={p.title}
                          width="60"
                        />

                      ) : (
                        "No image"
                      )}
                    </td>
                    <td>{p.title}</td>
                    <td>{p.category}</td>
                    <td>{p.price || "-"}</td>
                    <td>{new Date(p.created_at).toLocaleString()}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenModal(p)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}

        {/* Pagination */}
        <div className="d-flex justify-content-center">
          <Pagination>
            {[...Array(meta.pages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === page}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>

        {/* Add/Edit Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingProduct ? "Edit Product" : "Add Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Modal.Footer>
        </Modal>
    </DashboardLayout>
  );
};

export default DashboardProducts;
