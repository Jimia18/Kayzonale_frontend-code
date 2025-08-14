import React, { useState, useEffect, useCallback } from "react";
import DashboardLayout from './dashboardLayout';
import AdminSidebar from "../components/AdminSidebar";
import { Modal, Button, Form, Table, Spinner, Alert, Pagination } from "react-bootstrap";
import api from "../api";
import { toast } from "react-toastify";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPaymentsModal, setShowPaymentsModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    project_id: "",
    client_id: "",
    notes: "",
    status: "Pending",
  });

  const [payments, setPayments] = useState([]);
  const [selectedOrderForPayments, setSelectedOrderForPayments] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Date filter state
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = window.innerWidth <= 768;

  // Fetch all needed data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [orderRes, clientRes, projectRes] = await Promise.all([
        api.get("/orders"),
        api.get("/clients"),
        api.get("/projects"),
      ]);

      setOrders(orderRes.data);
      setClients(clientRes.data);
      setProjects(projectRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Failed to fetch data from server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter and paginate orders
  const filteredOrders = orders.filter(order => {
    if (filterStartDate && new Date(order.created_at) < new Date(filterStartDate)) return false;
    if (filterEndDate && new Date(order.created_at) > new Date(filterEndDate)) return false;
    return true;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Open payments modal and fetch payments for an order
  const handleViewPayments = async (order) => {
    try {
      const res = await api.get(`/orders/${order.order_id}`);
      setPayments(res.data.payments || []);
      setSelectedOrderForPayments(order);
      setShowPaymentsModal(true);
    } catch (error) {
      console.error("Error fetching payments", error);
      toast.error("Failed to load payments");
    }
  };

  // Handlers for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle create or update order
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode && editingOrderId) {
        await api.put(`/orders/update/${editingOrderId}`, formData);
        toast.success("Order updated successfully");
      } else {
        await api.post("/orders/create", formData);
        toast.success("Order created successfully");
      }
      fetchData();
      handleOrderModalClose();
    } catch (error) {
      console.error("Error saving order", error);
      toast.error(error.response?.data?.error || "Failed to save order");
    }
  };

  // Edit order modal open
  const handleEditClick = (order) => {
    setIsEditMode(true);
    setEditingOrderId(order.order_id);
    setFormData({
      project_id: order.project_id || "",
      client_id: order.client_id || "",
      notes: order.notes || "",
      status: order.status || "Pending",
    });
    setShowOrderModal(true);
  };

  // Delete order
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await api.delete(`/orders/delete/${orderId}`);
      toast.success("Order deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting order", error);
      toast.error(error.response?.data?.error || "Failed to delete order");
    }
  };

  // Reset modal state
  const handleOrderModalClose = () => {
    setShowOrderModal(false);
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
      description="Manage all orders here"
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isMobile={isMobile}
      SidebarComponent={AdminSidebar}
    >
      <div className="mb-3 d-flex flex-wrap gap-2 align-items-center">
        <Button onClick={() => setShowOrderModal(true)}>+ New Order</Button>

        <Form.Group controlId="filterStartDate" className="me-2">
          <Form.Label className="mb-0">Start Date:</Form.Label>
          <Form.Control
            type="date"
            value={filterStartDate}
            onChange={e => setFilterStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="filterEndDate">
          <Form.Label className="mb-0">End Date:</Form.Label>
          <Form.Control
            type="date"
            value={filterEndDate}
            onChange={e => setFilterEndDate(e.target.value)}
          />
        </Form.Group>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading orders...</p>
        </div>
      ) : (
        <>
          {filteredOrders.length === 0 ? (
            <Alert variant="info">No orders found for selected criteria.</Alert>
          ) : (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Client</th>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map(order => (
                    <tr key={order.order_id}>
                      <td>{order.order_id}</td>
                      <td>{clients.find(c => c.client_id === order.client_id)?.full_name || "N/A"}</td>
                      <td>{projects.find(p => p.project_id === order.project_id)?.name || "N/A"}</td>
                      <td>{order.status}</td>
                      <td>{order.notes}</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>
                        <Button variant="info" size="sm" onClick={() => handleViewPayments(order)} className="me-2">
                          View Payments
                        </Button>
                        <Button variant="warning" size="sm" onClick={() => handleEditClick(order)} className="me-2">
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteOrder(order.order_id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Pagination className="justify-content-center">
                {[...Array(totalPages).keys()].map(num => (
                  <Pagination.Item
                    key={num + 1}
                    active={num + 1 === currentPage}
                    onClick={() => handlePageChange(num + 1)}
                  >
                    {num + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </>
          )}
        </>
      )}

      {/* Create/Edit Order Modal */}
      <Modal show={showOrderModal} onHide={handleOrderModalClose}>
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
                {clients.map(c => (
                  <option key={c.client_id} value={c.client_id}>{c.full_name}</option>
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
                {projects.map(p => (
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
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleOrderModalClose}>Cancel</Button>
            <Button variant="primary" type="submit">{isEditMode ? "Update" : "Create"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Payments Modal */}
      <Modal show={showPaymentsModal} onHide={() => setShowPaymentsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Payments for Order #{selectedOrderForPayments?.order_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {payments.length === 0 ? (
            <Alert variant="info">No payments recorded for this order.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Reference</th>
                  <th>Paid At</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.payment_id}>
                    <td>{p.payment_id}</td>
                    <td>UGX {p.amount.toLocaleString()}</td>
                    <td>{p.method}</td>
                    <td>{p.reference || "-"}</td>
                    <td>{new Date(p.paid_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPaymentsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
};

export default OrderManagement;
