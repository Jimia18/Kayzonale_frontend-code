import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Modal, Form, Spinner, Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardLayout from "../admin/dashboardLayout";
import AdminSidebar from "../components/AdminSidebar";

const ServiceManagement = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", image: null, preview: null });

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userRole");
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Redirect if unauthorized
  useEffect(() => {
    if (!token || (userType !== "admin" && userType !== "staff")) {
      toast.error("Access denied. Only admin/staff can access this page.");
      navigate("/");
    }
  }, [token, userType, navigate]);

  // Fetch services
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/v1/services/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
    } catch (err) {
      toast.error("Failed to load services");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token, API_BASE_URL]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // Handle input changes
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

  // Handle create/update
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      const config = {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      };

      if (currentService) {
        await axios.put(`${API_BASE_URL}/api/v1/services/update/${currentService.id}`, data, config);
        toast.success("Service updated");
      } else {
        await axios.post(`${API_BASE_URL}/api/v1/services/create`, data, config);
        toast.success("Service created");
      }

      setShowModal(false);
      setFormData({ name: "", description: "", image: null, preview: null });
      setCurrentService(null);

      fetchServices();
    } catch (err) {
      toast.error("Error saving service");
      console.error(err);
    }
  };

  // Handle edit
  const handleEdit = (service) => {
    setCurrentService(service);
    setFormData({
      name: service.name,
      description: service.description,
      image: null,
      preview: service.image_url || null,
    });
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/v1/services/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Service deleted");
      fetchServices();
    } catch (err) {
      toast.error("Failed to delete service");
      console.error(err);
    }
  };

  return (
    <DashboardLayout
      title="Services"
      description="Add, Edit, and Delete your Services"
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isMobile={isMobile}
      SidebarComponent={AdminSidebar}
    >
      <div className="py-4">
        <Button onClick={() => setShowModal(true)} className="mb-3">
          Add a Service
        </Button>

        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th style={{ width: "600px" }}>Description</th>
                <th>Image</th>
                <th style={{ width: "100px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.description}</td>
                  <td>
                    {s.image_url && (
                      <Image
                        src={s.image_url.startsWith("http") ? s.image_url : `${API_BASE_URL}/${s.image_url.replace(/^\/+/, "")}`}
                        alt={s.name}
                        thumbnail
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>
                  <td>
                    <Button variant="info" size="sm" onClick={() => handleEdit(s)}>
                      Edit
                    </Button>{" "}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(s.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{currentService ? "Edit Service" : "Add Service"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={formData.name} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
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
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {currentService ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default ServiceManagement;
