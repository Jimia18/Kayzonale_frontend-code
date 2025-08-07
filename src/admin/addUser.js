import React, { useState } from 'react';
import axios from 'axios';

const AddStaff = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    contact: '',
    email: '',
    user_type: 'staff',
    password: '',
    biography: '',
    super_key: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post('http://localhost:5000/api/v1/auth/register', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setMessage(res.data.message || 'Staff added successfully');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register staff');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h3 className="mb-4 text-xl font-semibold">Add New Staff</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="first_name" placeholder="First Name" className="form-control" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Last Name" className="form-control" onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact" className="form-control" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="form-control" onChange={handleChange} required />

        <select name="user_type" onChange={handleChange} className="form-select" value={formData.user_type}>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>

        {formData.user_type === 'staff' && (
          <textarea name="biography" placeholder="Biography" className="form-control" onChange={handleChange} required />
        )}

        {formData.user_type === 'admin' && (
          <input type="text" name="super_key" placeholder="Super Key" className="form-control" onChange={handleChange} required />
        )}

        <button type="submit" className="btn btn-primary w-full">Add Staff</button>
      </form>
    </div>
  );
};

export default AddStaff;
