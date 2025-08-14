import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
import DashboardLayout from "./dashboardLayout";
import AdminSidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ClientManagement = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  const userType = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  useEffect(() => {
    if (!token || (userType !== "admin" && userType !== "staff")) {
      toast.error("Access denied. Only admin/staff can access this page.");
      navigate("/");
    }
  }, [token, userType, navigate]);

  const fetchClients = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/clients/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(response.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/v1/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Client deleted successfully");
      fetchClients();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete client");
    }
  };

  const handleEdit = (client) => {
    const [firstName, ...rest] = client.full_name.split(" ");
    setSelectedClient({
      ...client,
      first_name: firstName,
      last_name: rest.join(" "),
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!selectedClient) return;
    
    try {
      const updatedData = {
        full_name: `${selectedClient.first_name} ${selectedClient.last_name}`,
        email: selectedClient.email,
        contact: selectedClient.contact,
        address: selectedClient.address,
        company_name: selectedClient.company_name,
      };

      await axios.put(
        `http://localhost:5000/api/v1/clients/${selectedClient.client_id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success("Client updated successfully");
      setShowModal(false);
      fetchClients();
    } catch (error) {
      console.error("Update error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      toast.error(error.response?.data?.error || "Failed to update client");
    }
  };

  // Properly defined handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedClient((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardLayout
      title="Client Management"
      description="Manage all registered clients"
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isMobile={isMobile}
      SidebarComponent={AdminSidebar}
    >
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Company</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={client.client_id}>
                <td>{index + 1}</td>
                <td>{client.full_name}</td>
                <td>{client.email}</td>
                <td>{client.contact}</td>
                <td>{client.company_name}</td>
                <td>{client.address}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(client)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(client.client_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClient && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={selectedClient.first_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={selectedClient.last_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  name="company_name"
                  value={selectedClient.company_name || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="contact"
                  value={selectedClient.contact || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={selectedClient.email || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={selectedClient.address || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
};

export default ClientManagement;