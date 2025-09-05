import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "./dashboardLayout";
import AdminSidebar from "../components/AdminSidebar";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userRole");
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (!token || (userType !== "admin" && userType !== "staff")) {
      toast.error("Access denied. Only admin/staff can access this page.");
      navigate("/");
    }
  }, [token, userType, navigate]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsRes, ordersRes, paymentsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/v1/orders/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/api/v1/orders/filter?limit=5`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/api/v1/orders/report/financial`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats(statsRes.data);
        setRecentOrders(ordersRes.data);
        setRecentPayments(paymentsRes.data.report || []);
      } catch (error) {
        toast.error("Failed to fetch dashboard data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL, token]);

  const renderSpinner = () => (
    <div className="text-center py-4">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  const renderTable = (data, columns) => (
    <table className="table table-sm">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={item.order_id || item.payment_id || idx}>
            {columns.map((col) => (
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
      {/* Stats Cards */}
      <section className="row mb-4">
        <div className="col-md-3 col-6 mb-3">
          <div className="bg-white p-3 rounded shadow-sm text-center">
            <h6 className="text-muted">Total Orders</h6>
            <h3 className="text-primary">{stats.total_orders || 0}</h3>
            <small className="text-muted">All time</small>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="bg-white p-3 rounded shadow-sm text-center">
            <h6 className="text-muted">Pending Orders</h6>
            <h3 className="text-warning">{stats.pending_orders || 0}</h3>
            <small className="text-muted">Awaiting processing</small>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="bg-white p-3 rounded shadow-sm text-center">
            <h6 className="text-muted">Completed Orders</h6>
            <h3 className="text-success">{stats.completed_orders || 0}</h3>
            <small className="text-muted">Successfully delivered</small>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="bg-white p-3 rounded shadow-sm text-center">
            <h6 className="text-muted">Today's Orders</h6>
            <h3 className="text-info">{stats.today_orders || 0}</h3>
            <small className="text-muted">Placed today</small>
          </div>
        </div>
      </section>

      {/* Revenue Cards */}
      <section className="row mb-5">
        <div className="col-md-6 mb-3">
          <div className="bg-white p-4 rounded shadow-sm">
            <h6 className="text-muted mb-3">💰 Total Revenue</h6>
            {loading ? (
              renderSpinner()
            ) : (
              <div className="d-flex align-items-center">
                <h2 className="text-success mb-0">
                  UGX {stats.total_revenue ? Number(stats.total_revenue).toLocaleString() : 0}
                </h2>
              </div>
            )}
            <small className="text-muted">All time revenue</small>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="bg-white p-4 rounded shadow-sm">
            <h6 className="text-muted mb-3">📈 Monthly Revenue</h6>
            {loading ? (
              renderSpinner()
            ) : (
              <div className="d-flex align-items-center">
                <h2 className="text-primary mb-0">
                  UGX {stats.monthly_revenue ? Number(stats.monthly_revenue).toLocaleString() : 0}
                </h2>
              </div>
            )}
            <small className="text-muted">Revenue this month</small>
          </div>
        </div>
      </section>

      {/* Recent Orders & Payments */}
      <section className="row">
        {/* Recent Orders */}
        <div className="col-md-6 mb-4">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h6 className="mb-3">🛒 Recent Orders</h6>
            {loading
              ? renderSpinner()
              : recentOrders.length === 0
              ? <div className="text-center text-muted py-4">No orders found.</div>
              : renderTable(recentOrders, [
                  { key: "order_id", header: "ID" },
                  { key: "status", header: "Status" },
                  {
                    key: "created_at",
                    header: "Date",
                    render: (item) => new Date(item.created_at).toLocaleDateString(),
                  },
                ])}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="col-md-6 mb-4">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h6 className="mb-3">💵 Recent Payments</h6>
            {loading
              ? renderSpinner()
              : recentPayments.length === 0
              ? <div className="text-center text-muted py-4">No payments found.</div>
              : renderTable(recentPayments, [
                  {
                    key: "amount",
                    header: "Amount",
                    render: (item) => `UGX ${Number(item.amount).toLocaleString()}`,
                  },
                  { key: "method", header: "Method" },
                  {
                    key: "created_at",
                    header: "Date",
                    render: (item) => new Date(item.created_at).toLocaleDateString(),
                  },
                ])}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
