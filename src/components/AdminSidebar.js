// import React from "react";
// import { Offcanvas, Nav } from "react-bootstrap";
// import { NavLink } from "react-router-dom";

// const AdminSidebar = ({ show, onHide, isMobile }) => {
//   const SidebarContent = () => (
//     <>
//       <h5 className="text-white mb-4">Admin Panel</h5>
//       <Nav className="flex-column gap-2">

//         <Nav.Item>
//           <NavLink
//             to="/admin/dashboard"
//             className={({ isActive }) =>
//               "nav-link text-white" + (isActive ? " active fw-bold text-decoration-underline" : "")
//             }
//             onClick={onHide}
//           >
//             Dashboard
//           </NavLink>
//         </Nav.Item>

//         <Nav.Item>
//           <NavLink
//             to="/admin/client-management"
//             className={({ isActive }) =>
//               "nav-link text-white" + (isActive ? " active fw-bold text-decoration-underline" : "")
//             }
//             onClick={onHide}
//           >
//             Client Management
//           </NavLink>
//         </Nav.Item>

//         <Nav.Item>
//           <NavLink
//             to="/admin/orders"
//             className={({ isActive }) =>
//               "nav-link text-white" + (isActive ? " active fw-bold text-decoration-underline" : "")
//             }
//             onClick={onHide}
//           >
//             Orders
//           </NavLink>
//         </Nav.Item>

//         <Nav.Item>
//           <NavLink
//             to="/admin/payments"
//             className={({ isActive }) =>
//               "nav-link text-white" + (isActive ? " active fw-bold text-decoration-underline" : "")
//             }
//             onClick={onHide}
//           >
//             Payments
//           </NavLink>
//         </Nav.Item>

//         <Nav.Item>
//           <NavLink
//             to="/admin/reports"
//             className={({ isActive }) =>
//               "nav-link text-white" + (isActive ? " active fw-bold text-decoration-underline" : "")
//             }
//             onClick={onHide}
//           >
//             Reports
//           </NavLink>
//         </Nav.Item>

//         <Nav.Item>
//           <NavLink
//             to="/admin/show-users"
//             className={({ isActive }) =>
//               "nav-link text-white" + (isActive ? " active fw-bold text-decoration-underline" : "")
//             }
//             onClick={onHide}
//           >
//             Show Users
//           </NavLink>
//         </Nav.Item>

//         <Nav.Item>
//           <NavLink
//             to="/admin/staff-management"
//             className={({ isActive }) =>
//               "nav-link text-white" + (isActive ? " active fw-bold text-decoration-underline" : "")
//             }
//             onClick={onHide}
//           >
//             Staff Management
//           </NavLink>
//         </Nav.Item>

//         <Nav.Item>
//           <NavLink
//             to="/admin/settings"
//             className={({ isActive }) =>
//               "nav-link text-white" + (isActive ? " active fw-bold text-decoration-underline" : "")
//             }
//             onClick={onHide}
//           >
//             Settings
//           </NavLink>
//         </Nav.Item>

//       </Nav>
//     </>
//   );

//   return (
//     <>
//       {isMobile ? (
//         <Offcanvas
//           show={show}
//           onHide={onHide}
//           placement="start"
//           className="bg-dark text-white"
//           backdrop={true}
//         >
//           <Offcanvas.Header closeButton closeVariant="white" />
//           <Offcanvas.Body>{SidebarContent()}</Offcanvas.Body>
//         </Offcanvas>
//       ) : (
//         <div
//           className="d-flex flex-column bg-dark text-white p-3"
//           style={{ width: "250px", minHeight: "100vh", position: "fixed" }}
//         >
//           {SidebarContent()}
//         </div>
//       )}
//     </>
//   );
// };

// export default AdminSidebar;


import React, { useState } from "react";
import { Offcanvas, Nav, Collapse, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminSidebar = ({ show, onHide, isMobile }) => {
  const [openManagement, setOpenManagement] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    toast.success('Logged out successfully');
   setTimeout(() => {
    navigate('/');
  }, 1500);
  };

  const SidebarContent = () => (
    <div className="d-flex flex-column justify-content-between h-100">
      {/* Top Logo and Navigation */}
      <div>
        <div className="text-center mb-4">
          <img
            src="/images/Kayzonale logo.jpg"
            alt="Admin Logo"
            style={{ maxHeight: "60px", objectFit: "contain" }}
            className="img-fluid"
          />
        </div>

        <Nav className="flex-column gap-2">
          <Nav.Item>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "fw-bold text-warning" : ""}`
              }
              onClick={onHide}
            >
              Home
            </NavLink>
          </Nav.Item>

          {/* Collapsible Management Section */}
          <Nav.Item>
            <Button
              variant="link"
              onClick={() => setOpenManagement(!openManagement)}
              className="text-white text-start w-100"
              style={{paddingLeft:'1rem'}}
              aria-expanded={openManagement}
            >
              Management {openManagement ? "▾" : "▸"}
            </Button>
            <Collapse in={openManagement}>
              <div className="ms-3">
                <NavLink to="/admin/clientManagement" className="nav-link text-white" onClick={onHide}>
                  Client Management
                </NavLink>
                <NavLink to="/admin/staffManagement" className="nav-link text-white" onClick={onHide}>
                  Staff Management
                </NavLink>
                <NavLink to="/admin/serviceManagement" className="nav-link text-white" onClick={onHide}>
                  Service Managemant
                </NavLink>
                <NavLink to='/admin/productManagement'className='nav-link text-white' onClick={onHide}>
                  Product Management
                </NavLink>
                <NavLink to='/admin/orderManagement'className='nav-link text-white' onClick={onHide}>
                  Order Management
                </NavLink>
              </div>
            </Collapse>
          </Nav.Item> 
          
          <Nav.Item>
            <NavLink to="/admin/showUsers" className="nav-link text-white" onClick={onHide}>
              Show Users
            </NavLink>
          </Nav.Item>
        </Nav>
      </div>

      {/* Bottom: Profile Info & Logout */}
      <div className="mt-4">
        <hr className="border-white" />
        <div className="text-white small mb-2 px-2">Logged in as Admin</div>
        <Button
          variant="outline-light"
          size="sm"
          className="w-100"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Offcanvas */}
      {isMobile ? (
        <Offcanvas
          show={show}
          onHide={onHide}
          placement="start"
          className="bg-primary text-white"
        >
          <Offcanvas.Header closeButton closeVariant="white" />
          <Offcanvas.Body>{SidebarContent()}</Offcanvas.Body>
        </Offcanvas>
      ) : (
        // Desktop Sidebar
        <div
          className="d-flex flex-column  text-white p-3"
          style={{ width: "250px", minHeight: "100vh", position: "fixed", backgroundColor: "#1840b9ff" }}
        >
          {SidebarContent()}
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
