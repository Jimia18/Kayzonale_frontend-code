import React, { useEffect, useState } from 'react';
import DashboardLayout from './dashboardLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../api';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  // State management
  const [dashboardData, setDashboardData] = useState({
    stats: { total_orders: 0, pending_orders: 0, completed_orders: 0 },
    recentOrders: [],
    recentPayments: []
  });
  
  const [loading, setLoading] = useState({
    stats: true,
    orders: true,
    payments: true
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Data fetching
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, ordersRes, paymentsRes] = await Promise.all([
          api.get('/orders/stats'),
          api.get('/orders?limit=5'),
          api.get('/payments?limit=5')
        ]);

        setDashboardData({
          stats: statsRes.data,
          recentOrders: ordersRes.data,
          recentPayments: paymentsRes.data.slice(0, 5)
        });
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading({ stats: false, orders: false, payments: false });
      }
    };

    fetchDashboardData();
  }, []);

  // Chart data preparation
  const chartData = [
    { name: 'Total', value: dashboardData.stats.total_orders },
    { name: 'Pending', value: dashboardData.stats.pending_orders },
    { name: 'Completed', value: dashboardData.stats.completed_orders },
  ];

  // Helper components
  const renderLoadingSpinner = () => (
    <div className="text-center py-4">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  const renderNoDataMessage = () => <p>No data available.</p>;

  const renderTable = (data, columns) => (
    <table className="table table-sm">
      <thead>
        <tr>
          {columns.map(col => <th key={col.key}>{col.header}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id || item.order_id || item.payment_id}>
            {columns.map(col => (
              <td key={col.key}>
                {col.render ? col.render(item) : item[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <DashboardLayout
      title="Admin Dashboard"
      description="Track your orders, payments, and statistics"
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isMobile={isMobile}
      SidebarComponent={AdminSidebar}
    >
      {/* Statistics Section */}
      <section className="mb-5 bg-white p-4 rounded shadow-sm">
        <h5 className="mb-3">📊 Order Statistics</h5>
        {loading.stats ? (
          renderLoadingSpinner()
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="value" 
                fill="#0d6efd" 
                radius={[6, 6, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </section>

      {/* Recent Data Section */}
      <section className="row">
        {/* Recent Orders */}
        <div className="col-md-6 mb-4">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h6 className="mb-3">🛒 Recent Orders</h6>
            {loading.orders ? (
              renderLoadingSpinner()
            ) : dashboardData.recentOrders.length === 0 ? (
              renderNoDataMessage()
            ) : (
              renderTable(dashboardData.recentOrders, [
                { key: 'order_id', header: 'ID' },
                { key: 'status', header: 'Status' },
                { 
                  key: 'created_at', 
                  header: 'Date',
                  render: (item) => new Date(item.created_at).toLocaleDateString()
                }
              ])
            )}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="col-md-6 mb-4">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h6 className="mb-3">💵 Recent Payments</h6>
            {loading.payments ? (
              renderLoadingSpinner()
            ) : dashboardData.recentPayments.length === 0 ? (
              renderNoDataMessage()
            ) : (
              renderTable(dashboardData.recentPayments, [
                { 
                  key: 'amount', 
                  header: 'Amount',
                  render: (item) => `UGX ${item.amount.toLocaleString()}`
                },
                { key: 'method', header: 'Method' },
                { 
                  key: 'created_at', 
                  header: 'Date',
                  render: (item) => new Date(item.created_at).toLocaleDateString()
                }
              ])
            )}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;