import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from './dashboardLayout';
import { Toast, ToastContainer } from "react-bootstrap";

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("create"); // or 'edit'
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/services", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(res.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        showToast("Failed to load services", "danger");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [token]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.price === "" || isNaN(formData.price) || Number(formData.price) < 0)
      newErrors.price = "Price must be a positive number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ show: false, message: "", variant: "" }), 3000);
  };

  const openCreateForm = () => {
    setFormMode("create");
    setFormData({ id: null, name: "", price: "", description: "" });
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (service) => {
    setFormMode("edit");
    setFormData({
      id: service.id,
      name: service.name,
      price: service.price,
      description: service.description || "",
    });
    setErrors({});
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (formMode === "create") {
        await axios.post(
          "/api/v1/services/create",
          {
            name: formData.name,
            price: Number(formData.price),
            description: formData.description,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showToast("Service created successfully");
      } else {
        await axios.put(
          `/api/v1/services/update/${formData.id}`,
          {
            name: formData.name,
            price: Number(formData.price),
            description: formData.description,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showToast("Service updated successfully");
      }

      // Refresh services list
      const res = await axios.get("/api/v1/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving service:", error);
      showToast("Failed to save service", "danger");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await axios.delete(`/api/v1/services/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices((prev) => prev.filter((s) => s.id !== id));
      showToast("Service deleted successfully");
    } catch (error) {
      console.error("Error deleting service:", error);
      showToast("Failed to delete service", "danger");
    }
  };

  if (!token) {
    // If no token, redirect to login or homepage
    navigate("/");
    return null;
  }

  return (
      <DashboardLayout
        title="Service Management"
        description="Add, edit, and delete services offered by your platform"
      >
        <div className="container mt-4">
          <h2>Services Management</h2>

      {role === "admin" && (
        <button className="btn btn-primary mb-3" onClick={openCreateForm}>
          + Add Service
        </button>
      )}

      {loading ? (
        <p>Loading services...</p>
      ) : services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price (UGX)</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
                {role === "admin" && (
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => openEditForm(service)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(service.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="card p-3 mb-4">
          <h4>{formMode === "create" ? "Add New Service" : "Edit Service"}</h4>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                onChange={handleChange}
                required
                autoFocus
              />
              <div className="invalid-feedback">{errors.name}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price (UGX) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
              <div className="invalid-feedback">{errors.price}</div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <button type="submit" className="btn btn-success me-2">
              {formMode === "create" ? "Create" : "Update"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toast.variant}
          onClose={() => setToast({ show: false, message: "", variant: "" })}
          show={toast.show}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
        </DashboardLayout>
  );
};

export default ServiceManagement;
