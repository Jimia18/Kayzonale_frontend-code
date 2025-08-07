import React, { useState, useEffect } from "react";
import DashboardLayout from './dashboardLayout';
import axios from "axios";

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "Concept",
    deadline: "",
    price: 0,
    payment_status: "Unpaid",
    delivery_status: "Pending",
    client_id: "",
  });
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/v1/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    const fetchClients = async () => {
      try {
        const res = await axios.get("/api/v1/clients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClients(res.data);
      } catch (error) {
        console.error("Error fetching clients", error);
      }
    };

    fetchProjects();
    fetchClients();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/projects/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Project created successfully");
      setFormData({
        title: "",
        description: "",
        category: "",
        status: "Concept",
        deadline: "",
        price: 0,
        payment_status: "Unpaid",
        delivery_status: "Pending",
        client_id: "",
      });
      // Reload projects
      const updated = await axios.get("/api/v1/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(updated.data);
    } catch (error) {
      console.error("Error creating project", error);
      alert("Failed to create project");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`/api/v1/projects/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project", error);
      alert("Failed to delete project");
    }
  };

  return (
      <DashboardLayout
      title="Project Management"
      description="Manage your projects efficiently"
    >
      <div className="container mt-4">
        <h2>Project Management</h2>

      {role !== "admin" && role !== "staff" ? (
        <p className="text-danger">You do not have permission to view this page.</p>
      ) : (
        <>
          <form onSubmit={handleCreateProject} className="mb-4">
            <h4>Create New Project</h4>
            <div className="mb-3">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label>Client</label>
              <select
                name="client_id"
                className="form-control"
                value={formData.client_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client.client_id} value={client.client_id}>
                    {client.full_name || client.company_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Status</label>
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Concept">Concept</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Deadline</label>
              <input
                type="date"
                name="deadline"
                className="form-control"
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Price (UGX)</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Create Project
            </button>
          </form>

          <h4>Existing Projects</h4>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Client</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No projects found.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{p.status}</td>
                    <td>{p.deadline ? new Date(p.deadline).toLocaleDateString() : "N/A"}</td>
                    <td>{clients.find(c => c.client_id === p.client_id)?.full_name || "N/A"}</td>
                    <td>
                      {role === "admin" && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteProject(p.id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
      </DashboardLayout>
  );
};

export default ProjectManagement;
