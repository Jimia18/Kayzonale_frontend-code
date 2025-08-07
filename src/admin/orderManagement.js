import React, { useState, useEffect } from "react";
import DashboardLayout from './dashboardLayout';
import axios from "axios";

import { Modal, Button, Form } from "react-bootstrap";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [role] = useState(localStorage.getItem("role") || "");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    project_id: "",
    client_id: "",
    notes: "",
    status: "Pending",
  });

  useEffect(() => {
    if (role !== "admin") return;

    const fetchData = async () => {
      try {
        const [orderRes, clientRes, projectRes] = await Promise.all([
          axios.get("/api/v1/orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/v1/clients", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/v1/projects", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setOrders(orderRes.data);
        setClients(clientRes.data);
        setProjects(projectRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [role, token]);

  const refreshOrders = async () => {
    const res = await axios.get("/api/v1/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode && editingOrderId) {
        await axios.put(`/api/v1/orders/update/${editingOrderId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/v1/orders/create", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      await refreshOrders();
      handleModalClose();
    } catch (error) {
      console.error("Error saving order", error);
      alert("Failed to save order");
    }
  };

  const handleEditClick = (order) => {
    setIsEditMode(true);
    setEditingOrderId(order.order_id);
    setFormData({
      project_id: order.project_id || "",
      client_id: order.client_id || "",
      notes: order.notes || "",
      status: order.status || "Pending",
    });
    setShowModal(true);
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(`/api/v1/orders/delete/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(prev => prev.filter(o => o.order_id !== orderId));
    } catch (error) {
      console.error("Error deleting order", error);
      alert("Failed to delete order");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingOrderId(null);
    setFormData({
      project_id: "",
      client_id: "",
      notes: "",
      status: "Pending",
    });
  };

  return (
      <DashboardLayout
        title="Order Management"
        description="Manage your orders efficiently"
      >
        
      {role !== "admin" ? (
        <p className="text-danger">You do not have permission to view this page.</p>
      ) : (
        <>
          <div className="d-flex justify-content-end mb-3">
            <Button onClick={() => setShowModal(true)}>+ New Order</Button>
          </div>

          <h4>Existing Orders</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Client</th>
                <th>Project</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{clients.find(c => c.client_id === order.client_id)?.full_name || "N/A"}</td>
                    <td>{projects.find(p => p.project_id === order.project_id)?.name || "N/A"}</td>
                    <td>{order.status}</td>
                    <td>{order.notes}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleEditClick(order)}>
                        Edit
                      </Button>{' '}
                      <Button variant="danger" size="sm" onClick={() => handleDeleteOrder(order.order_id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Modal */}
          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditMode ? "Edit Order" : "Create Order"}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleCreateOrUpdate}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Client</Form.Label>
                  <Form.Select
                    name="client_id"
                    value={formData.client_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Client</option>
                    {clients.map((c) => (
                      <option key={c.client_id} value={c.client_id}>
                        {c.full_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Project</Form.Label>
                  <Form.Select
                    name="project_id"
                    value={formData.project_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Project</option>
                    {projects.map((p) => (
                      <option key={p.project_id} value={p.project_id}>
                        {p.name} (UGX {p.price})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {isEditMode ? "Update" : "Create"}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      )}
          </DashboardLayout>
  );
};

export default OrderManagement;
