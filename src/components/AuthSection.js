// src/components/AuthSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AuthSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-4 text-center bg-white">
      <h4>Welcome! Sign in or Sign up to continue</h4>
      <div className="mt-3">
        <button className="btn btn-outline-primary me-3" onClick={() => navigate("/admin/admin-login")}>
          Admin Login
        </button>
        <button className="btn btn-outline-success me-3" onClick={() => navigate("/staff-signup")}>
          Staff Sign Up
        </button>
        <button className="btn btn-outline-secondary" onClick={() => alert("Client access coming soon!")}>
          Client Login
        </button>
      </div>
    </section>
  );
};

export default AuthSection;
