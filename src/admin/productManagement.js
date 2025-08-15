import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from './dashboardLayout';
import AdminSidebar from '../components/AdminSidebar';

const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const imageInputRef = useRef(null); // Create ref for file input
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [imageFile, setImageFile] = useState(null); // Store the actual file object

  // Fetch product if in edit mode
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/v1/products/${productId}`);
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price.toString(),
          category: data.category,
        });
        if (data.image) {
          setExistingImage(`http://localhost:5000${data.image}`);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid image type. Please upload JPEG, PNG, GIF, or WEBP');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    // Create preview and store file
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    setImageFile(file); // Store the file object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.category || !formData.price) {
      return toast.error('All fields are required');
    }

    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      return toast.error('Price must be a positive number');
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formPayload = new FormData();
      
      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      // Append image if it exists
      if (imageFile) {
        formPayload.append('image', imageFile);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      if (productId) {
        // Update product - CORRECT ENDPOINT
        await axios.put(
          `http://localhost:5000/api/v1/products/${productId}`, 
          formPayload, 
          config
        );
        toast.success('Product updated successfully');
      } else {
        // Create product - CORRECT ENDPOINT (removed /create)
        await axios.post(
          'http://localhost:5000/api/v1/products/', 
          formPayload, 
          config
        );
        toast.success('Product created successfully');
      }

      navigate('/admin/products');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Operation failed';
      toast.error(errorMessage);
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout
      title={productId ? 'Edit Product' : 'Add Product'}
      SidebarComponent={AdminSidebar}
    >
      <div className="container py-4">
        <div className="card shadow">
          <div className="card-body">
            <h2 className="mb-4">{productId ? 'Edit Product' : 'Add New Product'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category*</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Price*</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="form-control"
                    min="0.01"
                    step="0.01"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="4"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                  disabled={isLoading}
                  ref={imageInputRef}  // Add ref to input
                />
                <div className="mt-2">
                  {(imagePreview || existingImage) && (
                    <img 
                      src={imagePreview || existingImage} 
                      alt="Product preview" 
                      className="img-thumbnail" 
                      style={{ maxHeight: '200px' }}
                    />
                  )}
                  <small className="text-muted d-block mt-1">
                    {imagePreview ? 'New image selected' : existingImage ? 'Current product image' : 'No image selected'}
                  </small>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/pages/products page')}  // 
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      {productId ? 'Saving...' : 'Creating...'}
                    </>
                  ) : (
                    productId ? 'Save Changes' : 'Create Product'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductForm;