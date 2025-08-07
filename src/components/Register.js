import React, { useState } from 'react';
import axios from 'axios';
import AuthLayout from '../pages/AuthLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    password: '',
    user_type: 'user',  // Fixed to 'user'
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/register', form);

      toast.success(res.data.message || 'Registration successful');

      const token = res.data.access_token || '';

      if (rememberMe) {
        localStorage.setItem('accessToken', token);
      } else {
        sessionStorage.setItem('accessToken', token);
      }

      navigate('/'); // Redirect to homepage or dashboard
    } catch (err) {
      const message = err.response?.data?.error || 'Registration failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%', borderRadius: '15px' }}>
          <h3 className="text-center mb-4 text-dark">Create Account</h3>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label text-dark">First Name</label>
              <input
                type="text"
                name="first_name"
                className="form-control"
                value={form.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-dark">Last Name</label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                value={form.last_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-dark">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-dark">Contact</label>
              <input
                type="text"
                name="contact"
                className="form-control"
                value={form.contact}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-dark">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: '#e83e8c' }} disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="form-check d-flex align-items-center gap-2 justify-content-center mt-3">
            <input
              type="checkbox"
              className="form-check-input m-0"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
          </div>

          <div className="text-center mt-3">
            <small>
              Already have an account?{' '}
              <a href="/login" className="text-decoration-none text-pink">Login</a>
            </small>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
