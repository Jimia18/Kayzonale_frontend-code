import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Modal, Form, Spinner, Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardLayout from "../admin/dashboardLayout";
import AdminSidebar from "../components/AdminSidebar";

const categories = [
  'Large Format Printing',
  'Printing & Embroidery',
  'Branding & Stationery',
  'Paper & Promotional Products',
  'Specialty & Seasonal',
];

const ProductManagement = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: categories[0],
    price: "",
    image: null,
    preview: null,
  });

  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userRole");
  const navigate = useNavigate();

  // Check access
  useEffect(() => {
    if (!token || (userType !== "admin" && userType !== "staff")) {
      toast.error("Access denied. Only admin/staff can access this page.");
      navigate("/");
    }
  }, [token, userType, navigate]);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/v1/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle form changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
        preview: file ? URL.createObjectURL(file) : null,
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Submit form
  const handleSubmit = async () => {
    if (!formData.title || !formData.price) {
      toast.error("Please fill out Title and Price");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      if (formData.image) data.append("image", formData.image);

      const config = {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      };

      if (currentProduct) {
        await axios.put(`http://localhost:5000/api/v1/products/update/${currentProduct.id}`, data, config);
        toast.success("Product updated");
      } else {
        await axios.post("http://localhost:5000/api/v1/products/create", data, config);
        toast.success("Product created");
      }

      setShowModal(false);
      setFormData({ title: "", description: "", category: categories[0], price: "", image: null, preview: null });
      setCurrentProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error("Error saving product");
      console.error(err);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      category: product.category || categories[0],
      price: product.price,
      image: null,
      preview: product.image || null,
    });
    setShowModal(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/v1/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
      console.error(err);
    }
  };

  return (
    <DashboardLayout
      title="Products"
      description="Add, Edit, and Delete your Products"
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isMobile={isMobile}
      SidebarComponent={AdminSidebar}
    >
      <div className="py-4">
        <Button onClick={() => setShowModal(true)} className="mb-3">
          Add a Product
        </Button>

        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Image</th>
                <th style={{ width: "100px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.title}</td>
                  <td>{p.description}</td>
                  <td>{p.category}</td>
                  <td>{p.price.toLocaleString()}</td>
                  <td>
                    {p.image && (
                      <Image
                        src={p.image.startsWith("http") ? p.image : `http://localhost:5000/${p.image}`}
                        alt={p.title}
                        thumbnail
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>

                  <td>
                    <Button variant="info" size="sm" onClick={() => handleEdit(p)}>Edit</Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{currentProduct ? "Edit Product" : "Add Product"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" value={formData.title} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={formData.category} onChange={handleChange}>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="image" onChange={handleChange} />
              </Form.Group>
              {formData.preview && (
                <div className="mb-3 text-center">
                  <Image src={formData.preview} alt="Preview" thumbnail style={{ maxHeight: "150px" }} />
                </div>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>{currentProduct ? "Update" : "Create"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default ProductManagement;
