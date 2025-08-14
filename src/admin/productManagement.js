// src/pages/Admin/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DashboardLayout from './dashboardLayout';
import AdminSidebar from '../components/AdminSidebar';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const { productId } = useParams(); // if editing
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
  });
  const [image, setImage] = useState(null); // new image to upload
  const [existingImage, setExistingImage] = useState(null); // existing image for edit
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = window.innerWidth <= 768;

  // Fetch product data if editing
  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/products/${productId}`);
        setForm(res.data);
        setExistingImage(res.data.image);
      } catch (err) {
        toast.error('Failed to load product');
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
      if (!validTypes.includes(file.type)) return toast.error('Invalid image type');
      if (file.size > 5 * 1024 * 1024) return toast.error('Image too large (>5MB)');
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category || !form.price) {
      return toast.error('Please fill in all fields');
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append('image', image);

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (productId) {
        // Edit product
        await axios.put(`http://localhost:5000/api/v1/products/update/${productId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        });
        toast.success('Product updated successfully!');
      } else {
        // Add product
        await axios.post('http://localhost:5000/api/v1/products/create', formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        });
        toast.success('Product added successfully!');
      }
      navigate('/admin/products'); // redirect to products list
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title={productId ? 'Edit Product' : 'Add Product'}
      description="Manage your product details"
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isMobile={isMobile}
      SidebarComponent={AdminSidebar}
    >
      <div className="container d-flex justify-content-center align-items-center vh-80">
        <div className="product-form p-4 rounded shadow" style={{ maxWidth: '900px', width: '100%' }}>
          <h2 className="mb-3">{productId ? 'Edit Product' : 'Add Product'}</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="form-control mb-2" />
            <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="form-control mb-2" />
            <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="form-control mb-2" min="0" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="form-control mb-2" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mb-3" />
            
            {/* Image preview */}
            {image && <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '200px', marginBottom: '10px' }} />}
            {!image && existingImage && <img src={`http://localhost:5000${existingImage}`} alt="Current" style={{ maxWidth: '200px', marginBottom: '10px' }} />}
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (productId ? 'Updating...' : 'Adding...') : productId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductForm;
