
import React from 'react';
import '../styles/AuthLayout.css'; // we’ll define background animation there

const AuthLayout = ({ children }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="auth-form rounded">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
