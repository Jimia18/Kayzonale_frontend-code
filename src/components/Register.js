import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../pages/AuthLayout';
import  '../styles/register.css';
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
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const full_name = `${form.first_name} ${form.last_name}`;

      await axios.post('http://localhost:5000/api/v1/auth/register', {
        full_name,
        email: form.email,
        contact: form.contact,
        company_name: form.company_name,
        address:form.adress,
        password: form.password,
      });

      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Registration failed');
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
            className="form-control"
            placeholder="e.g. Jane"
            value={form.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label text-dark">Last Name</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            placeholder="e.g. Doe"
            value={form.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label text-dark">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label text-dark">Contact</label>
          <input
            type="text"
            name="contact"
            className="form-control"
            placeholder="e.g. 0700000000"
            value={form.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label text-dark">Create Password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="form-control"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="input-group-text"
              style={{
                cursor: 'pointer',
                backgroundColor: '#f8f9fa',
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="col-12">
          <label className="form-label text-dark">Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="input-group-text"
              style={{
                cursor: 'pointer',
                backgroundColor: '#f8f9fa',
              }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: '#e83e8c' }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>

      <div className="text-center mt-3">
        <small>
          Already have an account?{' '}
          <a href="/login" className="text-decoration-none text-pink">Login</a>
        </small>
      </div>
    </AuthLayout>
  );
};

export default Register;
