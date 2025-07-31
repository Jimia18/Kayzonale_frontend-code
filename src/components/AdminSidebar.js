import React, { useState } from 'react';
import {  Button, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../styles/AdminSidebar.css'; // Ensure you have this CSS file for custom styles
const AdminSidebar = () => {
  const [show, setShow] = useState(false);
  const toggleSidebar = () => setShow(!show);

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'bg-secondary text-white fw-bold' : 'text-white'}`;

  return (
    <>
      {/* Toggle Button for Mobile */}
      <Button
        variant="dark"
        onClick={toggleSidebar}
        className="d-lg-none m-2"
      >
        ☰ Menu
      </Button>

      {/* Sidebar for large screens */}
      <div className="d-none d-lg-block bg-dark text-white vh-100 p-3" style={{ width: '250px' }}>
        <div className="text-center mb-4">
          <Image src="/images/Kayzonale logo.jpg" alt="Logo" fluid style={{ maxHeight: '60px' }} />
        </div>
        <nav className="nav flex-column gap-2">
          <NavLink to= "/admin/adminHome" className={linkClass}>DashboardHome</NavLink>
          <NavLink to="/admin/orders" className={linkClass}>Orders</NavLink>
          <NavLink to="/admin/payments" className={linkClass}>Payments</NavLink>
          <NavLink to="/admin/clients" className={linkClass}>Clients</NavLink>
          <NavLink to="/admin/add-user" className={linkClass}>Add User</NavLink>
          <NavLink to="/admin/show-users" className={linkClass}>Show Users</NavLink>
          <NavLink to="/admin/myProfile" className={linkClass}>MyProfile</NavLink>
        </nav>
      </div>

      
    </>
  );
};

export default AdminSidebar;
