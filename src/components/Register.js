import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../pages/AuthLayout';
import '../styles/register.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    company_name: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!form.last_name.trim()) newErrors.last_name = 'Last name is required';
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!form.contact.trim()) {
      newErrors.contact = 'Contact is required';
    } else if (!/^[0-9]{10,15}$/.test(form.contact)) {
      newErrors.contact = 'Invalid phone number';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        contact: form.contact,
        password: form.password,
        company_name: form.company_name || "",
        address: form.address || "",
        user_type: "client" // Default role
      };

      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/register', 
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success(response.data.message || 'Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      const errorMsg = error.response?.data?.error || 
                      error.response?.data?.message || 
                      'Registration failed. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-4">
        <h3 className="fw-bold text-dark">Create Your Account</h3>
      </div>

      <form onSubmit={handleRegister} className="row g-3">
        <div className="col-md-6">
          <label className="form-label text-dark">First Name</label>
          <input
            type="text"
            name="first_name"
            className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
            placeholder="e.g. Jane"
            value={form.first_name}
            onChange={handleChange}
          />
          {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label text-dark">Last Name</label>
          <input
            type="text"
            name="last_name"
            className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
            placeholder="e.g. Doe"
            value={form.last_name}
            onChange={handleChange}
          />
          {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
        </div>

        <div className="col-12">
          <label className="form-label text-dark">Email Address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="col-12">
          <label className="form-label text-dark">Contact</label>
          <input
            type="text"
            name="contact"
            className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
            placeholder="e.g. 0700000000"
            value={form.contact}
            onChange={handleChange}
          />
          {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
        </div>

        <div className="col-12">
          <label className="form-label text-dark">Company Name (Optional)</label>
          <input
            type="text"
            name="company_name"
            className="form-control"
            placeholder="Your company name"
            value={form.company_name}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label text-dark">Address (Optional)</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Your address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label text-dark">Create Password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Create password (min 8 characters)"
              value={form.password}
              onChange={handleChange}
            />
            <span
              className="input-group-text"
              style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="col-12">
          <label className="form-label text-dark">Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <span
              className="input-group-text"
              style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: '#e83e8c' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Registering...
              </>
            ) : 'Register'}
          </button>
        </div>
      </form>

      <div className="text-center mt-3">
        <small>
          Already have an account?{' '}
          <Link to="/login" className="text-decoration-none" style={{ color: '#e83e8c' }}>Login</Link>
        </small>
      </div>
    </AuthLayout>
  );
};

export default Register;