import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import '../../styles/adminDashboard.css'; // optional but recommended

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="main-content">
        <h1>Welcome to the Admin Dashboard</h1>
        {/<Route>/}
      </div>
    </div>
  );
};

export default AdminDashboard;
