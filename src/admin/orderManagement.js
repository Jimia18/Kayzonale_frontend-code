import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Spinner, Modal} from "react-bootstrap";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = () => {
    const token = localStorage.getItem("token");
    axios.get("/api/v1/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios.delete(`/api/v1/orders/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => fetchOrders());
  };

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="p-4">
      <h2>Manage Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th><th>Status</th><th>Total</th><th>Created At</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.order_id}>
              <td>{o.order_id}</td>
              <td>{o.status}</td>
              <td>${o.total_amount}</td>
              <td>{new Date(o.created_at).toLocaleString()}</td>
              <td>
                <Button size="sm" onClick={() => setSelectedOrder(o)}>View</Button>{" "}
                <Button size="sm" variant="danger" onClick={() => handleDelete(o.order_id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for details */}
      <Modal show={!!selectedOrder} onHide={() => setSelectedOrder(null)}>
        <Modal.Header closeButton><Modal.Title>Order Details</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Total:</strong> ${selectedOrder.total_amount}</p>
              <p><strong>Notes:</strong> {selectedOrder.notes}</p>
              <h6>Items:</h6>
              <ul>
                {selectedOrder.items.map(i => (
                  <li key={i.id}>Product {i.product_id} x {i.quantity} (${i.price})</li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrdersManagement;
