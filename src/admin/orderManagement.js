import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Spinner,
  Alert,
  Pagination,
  Collapse,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import DashboardLayout from "./dashboardLayout";
import AdminSidebar from "../components/AdminSidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderManagement = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [expandedRows, setExpandedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [formData, setFormData] = useState({ notes: "", status: "", items: [] });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newOrderData, setNewOrderData] = useState({ client_id: "", notes: "", items: [] });

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userRole");
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const calculateTotal = (items) =>
    items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  // Auth check
  useEffect(() => {
    if (!token || userType !== "admin") {
      toast.error("Access denied. Only admin can access this page.");
      navigate("/");
    }
  }, [token, userType, navigate]);

  // Fetch Orders
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/orders/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders");
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/v1/orders/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order deleted");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete order");
    }
  };

  const handleEdit = (order) => {
    setCurrentOrder(order);
    setFormData({
      notes: order.notes || "",
      status: order.status || "",
      items: order.items.map((i) => ({ ...i })),
    });
    setShowEditModal(true);
  };

  const handleModalSave = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/v1/orders/update/${currentOrder.order_id}`,
        {
          notes: formData.notes,
          status: formData.status,
          items: formData.items,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order updated");
      setShowEditModal(false);
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order");
    }
  };

  const handleCreateOrder = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/v1/orders/create`,
        {
          client_id: newOrderData.client_id,
          notes: newOrderData.notes,
          items: newOrderData.items,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order created successfully");
      setShowCreateModal(false);
      setNewOrderData({ client_id: "", notes: "", items: [] });
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create order");
    }
  };

  const handleItemChange = (items, idx, field, value, setter) => {
    const newItems = [...items];
    newItems[idx][field] =
      field === "quantity" || field === "price" ? parseFloat(value) || 0 : value;
    setter(newItems);
  };

  const addItem = (items, setter) => {
    setter([...items, { product_id: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (items, idx, setter) => {
    const newItems = items.filter((_, i) => i !== idx);
    setter(newItems);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (o) =>
        (o.client_id.toString().includes(search) ||
          o.notes?.toLowerCase().includes(search.toLowerCase())) &&
        (filterStatus ? o.status.toLowerCase() === filterStatus.toLowerCase() : true)
    );
  }, [orders, search, filterStatus]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredOrders.length / pageSize)),
    [filteredOrders.length, pageSize]
  );

  const pagedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, page, pageSize]);

  const rowStyle = (status) =>
    status.toLowerCase() === "pending"
      ? { backgroundColor: "#fff3cd" }
      : { backgroundColor: "#d4edda" };

  return (
    <DashboardLayout
      title="Order Management"
      description="Manage all orders"
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isMobile={isMobile}
      SidebarComponent={AdminSidebar}
    >
      {/* Search & Create */}
      <div className="mb-3 d-flex gap-2">
        <Form.Control
          type="text"
          placeholder="Search by client or notes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Form.Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </Form.Select>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          Create New Order
        </Button>
      </div>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Client ID</th>
                <th>Status</th>
                <th>Total</th>
                <th>Notes</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedOrders.map((o, idx) => (
                <React.Fragment key={o.order_id}>
                  <tr style={rowStyle(o.status)}>
                    <td>{(page - 1) * pageSize + idx + 1}</td>
                    <td>{o.client_id}</td>
                    <td>{o.status}</td>
                    <td>${calculateTotal(o.items)}</td>
                    <td>{o.notes}</td>
                    <td>{new Date(o.created_at).toLocaleDateString()}</td>
                    <td className="d-flex gap-1">
                      <Button size="sm" onClick={() => toggleRow(o.order_id)}>
                        Items
                      </Button>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => handleEdit(o)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(o.order_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="7" className="p-0 border-0">
                      <Collapse in={expandedRows.includes(o.order_id)}>
                        <div className="p-2 bg-light">
                          <strong>Order Items:</strong>
                          <ul>
                            {o.items.map((i, index) => (
                              <li key={index}>
                                Product: {i.product_id}, Qty: {i.quantity}, Price: ${i.price}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <Pagination>
            <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
            <Pagination.Prev
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === page}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            />
            <Pagination.Last
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            />
          </Pagination>
        </>
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>
            <strong>Items</strong>
            {formData.items.map((item, idx) => (
              <InputGroup className="mb-2" key={idx}>
                <Form.Control
                  type="text"
                  placeholder="Product ID"
                  value={item.product_id}
                  onChange={(e) =>
                    handleItemChange(formData.items, idx, "product_id", e.target.value, (items) =>
                      setFormData({ ...formData, items })
                    )
                  }
                />
                <Form.Control
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(formData.items, idx, "quantity", e.target.value, (items) =>
                      setFormData({ ...formData, items })
                    )
                  }
                />
                <Form.Control
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(formData.items, idx, "price", e.target.value, (items) =>
                      setFormData({ ...formData, items })
                    )
                  }
                />
                <Button
                  variant="danger"
                  onClick={() =>
                    removeItem(formData.items, idx, (items) => setFormData({ ...formData, items }))
                  }
                >
                  X
                </Button>
              </InputGroup>
            ))}
            <Button
              variant="success"
              size="sm"
              onClick={() => addItem(formData.items, (items) => setFormData({ ...formData, items }))}
            >
              Add Item
            </Button>
            <Form.Group className="mt-2">
              <Form.Label>Total: </Form.Label>
              <Form.Control type="number" readOnly value={calculateTotal(formData.items)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Client ID</Form.Label>
              <Form.Control
                type="text"
                value={newOrderData.client_id}
                onChange={(e) =>
                  setNewOrderData({ ...newOrderData, client_id: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                value={newOrderData.notes}
                onChange={(e) =>
                  setNewOrderData({ ...newOrderData, notes: e.target.value })
                }
              />
            </Form.Group>

            <strong>Items</strong>
            {newOrderData.items.map((item, idx) => (
              <InputGroup className="mb-2" key={idx}>
                <Form.Control
                  type="text"
                  placeholder="Product ID"
                  value={item.product_id}
                  onChange={(e) =>
                    handleItemChange(newOrderData.items, idx, "product_id", e.target.value, (items) =>
                      setNewOrderData({ ...newOrderData, items })
                    )
                  }
                />
                <Form.Control
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(newOrderData.items, idx, "quantity", e.target.value, (items) =>
                      setNewOrderData({ ...newOrderData, items })
                    )
                  }
                />
                <Form.Control
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(newOrderData.items, idx, "price", e.target.value, (items) =>
                      setNewOrderData({ ...newOrderData, items })
                    )
                  }
                />
                <Button
                  variant="danger"
                  onClick={() =>
                    removeItem(newOrderData.items, idx, (items) =>
                      setNewOrderData({ ...newOrderData, items })
                    )
                  }
                >
                  X
                </Button>
              </InputGroup>
            ))}
            <Button
              variant="success"
              size="sm"
              onClick={() => addItem(newOrderData.items, (items) => setNewOrderData({ ...newOrderData, items }))}
            >
              Add Item
            </Button>
            <Form.Group className="mt-2">
              <Form.Label>Total: </Form.Label>
              <Form.Control type="number" readOnly value={calculateTotal(newOrderData.items)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleCreateOrder}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
};

export default OrderManagement;
