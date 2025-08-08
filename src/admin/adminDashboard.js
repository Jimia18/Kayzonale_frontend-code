import React, { useEffect, useState } from 'react';
import DashboardLayout from './dashboardLayout';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../api';
import AdminSidebar from '../components/AdminSidebar';


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_orders: 0,
    pending_orders: 0,
    completed_orders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState({ stats: true, orders: true, payments: true });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchStats();
    fetchRecentOrders();
    fetchRecentPayments();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/orders/stats');
      setStats(res.data);
    } catch (error) {
      toast.error("Failed to load stats");
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const res = await api.get('/orders?limit=5');
      setRecentOrders(res.data);
    } catch (error) {
      toast.error("Failed to load recent orders");
    } finally {
      setLoading(prev => ({ ...prev, orders: false }));
    }
  };

  const fetchRecentPayments = async () => {
    try {
      const res = await api.get('/payments');
      setRecentPayments(res.data.slice(0, 5));
    } catch (error) {
      toast.error("Failed to load payments");
    } finally {
      setLoading(prev => ({ ...prev, payments: false }));
    }
  };

  const chartData = [
    { name: 'Orders', value: stats.total_orders },
    { name: 'Pending', value: stats.pending_orders },
    { name: 'Completed', value: stats.completed_orders },
  ];

  return (
    <DashboardLayout
      title="Welcome to the Admin Dashboard"
      description="Track your orders, payments, and stats at a glance."
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isMobile={isMobile}
      SidebarComponent={AdminSidebar}
    >
      {/* Statistics Chart */}
      <div className="mb-5 bg-white p-4 rounded shadow-sm">
        <h5 className="mb-3 text-dark">📊 Order Statistics</h5>
        {loading.stats ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0d6efd" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Tables */}
      <div className="row">
        {/* Orders */}
        <div className="col-md-6 mb-4">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h6 className="mb-3">🛒 Recent Orders</h6>
            {loading.orders ? (
              <div className="text-center py-3">
                <Spinner animation="border" size="sm" />
              </div>
            ) : recentOrders.length === 0 ? (
              <p>No recent orders.</p>
            ) : (
              <table className="table table-sm">
                <thead>
                  <tr><th>ID</th><th>Status</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {recentOrders.map(o => (
                    <tr key={o.order_id}>
                      <td>{o.order_id}</td>
                      <td>{o.status}</td>
                      <td>{new Date(o.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Payments */}
        <div className="col-md-6 mb-4">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h6 className="mb-3">💵 Recent Payments</h6>
            {loading.payments ? (
              <div className="text-center py-3">
                <Spinner animation="border" size="sm" />
              </div>
            ) : recentPayments.length === 0 ? (
              <p>No recent payments.</p>
            ) : (
              <table className="table table-sm">
                <thead>
                  <tr><th>Amount</th><th>Method</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {recentPayments.map(p => (
                    <tr key={p.payment_id}>
                      <td>UGX {p.amount.toLocaleString()}</td>
                      <td>{p.method}</td>
                      <td>{new Date(p.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
