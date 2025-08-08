// src/pages/Admin/AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DashboardLayout from './dashboardLayout';
import AdminSidebar from '../components/AdminSidebar';


const AddProduct = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
  });
  const [image, setImage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return toast.error('Please select an image');

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('image', image);

    try {
      await axios.post('/api/v1/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Product added successfully!');
      setForm({ title: '', description: '', category: '', price: '' });
      setImage(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add product');
    }
  };

  return (
    <DashboardLayout
      title="Product Management"
      description="Add,Update and Delete your Products Here"
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isMobile={isMobile}
      SidebarComponent={AdminSidebar}
    >
    <div className="container d-flex justify-content-center align-items-center vh-80 ">
      <div className="product-form  p-4 rounded shadow" style={{ maxWidth: '900px', width: '100%' }}>
      <h2>Add Product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="form-control mb-2" />
        <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="form-control mb-2" />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="form-control mb-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="form-control mb-2" />
        <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mb-3" />
        <button className="btn btn-primary" type="submit">Add Product</button>
      </form>
      </div>
    </div>
  
  </DashboardLayout>
  );
};

export default AddProduct;
