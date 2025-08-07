import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../pages/AuthLayout';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        {
          email: form.email,
          password: form.password,
        }
      );

      const { access_token, user } = response.data;

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('accessToken', access_token);
      storage.setItem('userRole', user.user_type); // Store the actual role
      storage.setItem('user', JSON.stringify(user)); // Optional but useful

      toast.success('Login successful!');

      // ✅ Redirect immediately based on role
      if (user.user_type === 'admin') {
        navigate('/admin');
      } else if (user.user_type === 'staff') {
        navigate('/admin/staff-dashboard');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 'Login failed. Check credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card p-4 shadow" style={{ maxWidth: '450px', width: '100%', borderRadius: '15px' }}>
          <h3 className="text-center mb-4 text-dark">Login to Your Account</h3>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-dark">Email address</label>
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

            <div className="mb-4">
              <label className="form-label text-dark">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-check d-flex align-items-center gap-2 justify-content-center mb-3">
              <input
                type="checkbox"
                className="form-check-input m-0"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              className="btn w-100 text-white"
              style={{ backgroundColor: '#e83e8c' }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-3">
            <small>
              Don't have an account?{' '}
              <a href="/register" className="text-decoration-none text-pink">Register</a>
            </small>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
