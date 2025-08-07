// src/components/StaffSidebar.jsx
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const StaffSidebar = ({ show, onHide, isMobile }) => {
  const SidebarContent = () => (
    <>
      <h5 className="text-white mb-4">Staff Panel</h5>
      <Nav className="flex-column gap-2">
         <Nav.Item>
          <NavLink
            to="/staff/tasks"
            className={({ isActive }) =>
              "nav-link text-white" + (isActive ? " active" : "")
            }
            onClick={onHide}
          >
            Assigned Tasks
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            to="/staff/timesheets"
            className={({ isActive }) =>
              "nav-link text-white" + (isActive ? " active" : "")
            }
            onClick={onHide}
          >
            Timesheets
          </NavLink>
        </Nav.Item>
        {/* Add more links as needed */}
      </Nav>
    </>
  );

  if (isMobile) {
    const { Offcanvas } = require("react-bootstrap");
    return (
      <Offcanvas
        show={show}
        onHide={onHide}
        placement="start"
        className="bg-dark text-white"
        backdrop={true}
      >
        <Offcanvas.Header closeButton closeVariant="white" />
        <Offcanvas.Body>{SidebarContent()}</Offcanvas.Body>
      </Offcanvas>
    );
  }

  return (
    <div
      className="d-flex flex-column bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh", position: "fixed" }}
    >
      {SidebarContent()}
    </div>
  );
};

export default StaffSidebar;
