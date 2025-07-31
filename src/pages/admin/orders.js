import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import '../styles/orders.css'; // Create if you want to style

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  // fetchOrders function properly declared
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/v1/orders/filter', {
        params: { status, start, end },
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.error('Error loading orders:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to call fetchOrders on component mount and/or status/start/end change if desired
  useEffect(() => {
    fetchOrders();
  }, []);  // Empty dependency array means it runs once on mount

  return (
    <div className="orders-container">
      <div className="filter-section mb-4">
        <h4>Filter Orders</h4>
        <div className="d-flex gap-2 flex-wrap">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select w-auto">
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="form-control w-auto" />
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="form-control w-auto" />
          <button className="btn btn-primary" onClick={fetchOrders}>Apply Filters</button>
        </div>
      </div>

      <h3>Orders List</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>User</th>
              <th>Client</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.status}</td>
                <td>UGX {order.total_amount || 0}</td>
                <td>UGX {order.total_paid || 0}</td>
                <td>UGX {order.balance_due || 0}</td>
                <td>{order.user_id}</td>
                <td>{order.client_id}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
