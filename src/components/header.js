import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GetQuote from './getQuote';
import CartSidebar from './cart';
import { useCart } from '../components/cartContext';

const Header = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart(); // get cartItems from context

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <>
      {/* Fixed Header */}
      <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1030, backgroundColor: '#fff' }}>
        {/* Top Strip */}
        <div className="bg-dark text-white py-2">
          <div className="container d-flex justify-content-center align-items-center gap-3 flex-wrap">
            <span>🔥 Free delivery on all orders above 500K+</span>
            <NavLink to="/shop" className="btn btn-light btn-sm fw-bold px-3 py-1">Shop Now</NavLink>
          </div>
        </div>

        {/* Main Nav */}
        <div className="container-fluid d-flex align-items-center justify-content-between gap-3 flex-wrap py-2 bg-info">
          {/* Left: Hamburger + Logo */}
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-secondary d-lg-none">
              <i className="bi bi-list fs-4"></i>
            </button>
            <NavLink to="/" className="d-flex align-items-center text-decoration-none">
              <img src="/images/Kayzonale logo.jpg" alt="Kayzonale Logo" style={{ maxHeight: '50px' }} />
            </NavLink>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-grow-1 d-flex">
            <input type="text" className="form-control rounded-0 rounded-start" placeholder="Search products, brands and categories" />
            <button className="btn bg-primary text-white rounded-0 rounded-end">Search</button>
          </div>

          {/* Right: Account, Help, Cart */}
          <div className="d-flex align-items-center gap-3">
            {/* Account Dropdown */}
            <div className="dropdown">
              <button className="btn btn-light dropdown-toggle d-flex align-items-center gap-1" data-bs-toggle="dropdown">
                <i className="bi bi-person fs-5"></i> Account
              </button>
              <ul className="dropdown-menu dropdown-menu-end bg-primary">
                <li><NavLink to="/login" className="dropdown-item">Sign In</NavLink></li>
                <li><NavLink to="/register" className="dropdown-item">Register</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <li><NavLink to="/account" className="dropdown-item">My Account</NavLink></li>
                <li><NavLink to="/orders" className="dropdown-item">Orders</NavLink></li>
              </ul>
            </div>

            {/* Help Dropdown */}
            <div className="dropdown">
              <button className="btn btn-light dropdown-toggle d-flex align-items-center gap-1" data-bs-toggle="dropdown">
                <i className="bi bi-question-circle fs-5"></i> Help
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><NavLink to="/faq" className="dropdown-item">FAQs</NavLink></li>
                <li><NavLink to="/contact" className="dropdown-item">Contact Us</NavLink></li>
              </ul>
            </div>

            {/* Cart Button */}
            <button 
              className="btn btn-light position-relative"
              onClick={() => setIsCartOpen(true)}
            >
              <i className="bi bi-cart fs-5"></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="container-fluid d-flex text-dark align-items-center justify-content-between py-2 flex-wrap bg-light">
          {/* Categories Nav */}
          <nav className="d-flex gap-3 align-items-center flex-wrap ms-4">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'text-danger fw-bold' : 'text-dark'}`}>Home</NavLink>
            <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'text-danger fw-bold' : 'text-dark'}`}>Our Services</NavLink>
            <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'text-danger fw-bold' : 'text-dark'}`}>Our Products</NavLink>
            <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'text-danger fw-bold' : 'text-dark'}`}>Shop</NavLink>
          </nav>

          {/* Call info + Express button */}
          <div className="d-flex align-items-center gap-4 flex-wrap me-4">
            <div className="text-end d-none d-lg-block">
              <div className="small text-muted">CALL US NOW:</div>
              <div className="fw-bold text-pink">0705 783322</div>
            </div>
            <button
              className="btn btn-dark text-white fw-semibold px-4 py-2"
              onClick={() => setShowQuoteForm(true)}
            >
              Express Project ?
            </button>
          </div>
        </div>
      </div>

      {/* Offset for fixed header */}
      <div style={{ paddingTop: '170px' }}></div>

      {/* GetQuote Modal */}
      <GetQuote show={showQuoteForm} onClose={() => setShowQuoteForm(false)} />

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Header;
