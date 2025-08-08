import React from 'react';
import '../styles/AuthLayout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout d-flex justify-content-center align-items-center vh-80">
      <div className="auth-form bg-white p-4 rounded shadow" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <img
            src="/images/Kayzonale logo.jpg"
            alt="Kayzonale Logo"
            style={{ width: '90px', height: 'auto' }}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
