import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import GetQuote from './getQuote';
import CartSidebar from './cart'; // Import the CartSidebar component

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // State for cart sidebar
  const [cartItems, setCartItems] = useState([]); // State for cart items

  // Load cart from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    const total = cart.reduce((sum, item) => sum + (item.quantity || item.qty), 0);
    setCartCount(total);
  }, []);

  // Update cart count when cartItems change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.quantity || item.qty), 0);
    setCartCount(total);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      {/* Fixed Header */}
      <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1030, backgroundColor: '#fff' }}>
        
        {/* Top Strip */}
        <div className="bg-dark text-white py-2">
          <div className="container d-flex justify-content-center align-items-center gap-3 flex-wrap">
            <span>🔥 Free delivery on all orders above 500K+</span>
            <button className="btn btn-light btn-sm fw-bold px-3 py-1">Shop Now</button>
          </div>
        </div>

        {/* Main Nav */}
        <div className="container-fluid d-flex align-items-center justify-content-between gap-3 flex-wrap py-2" style={{ backgroundColor: 'lightblue' }}>
          {/* Left: Hamburger + Logo */}
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-secondary d-lg-none">
              <i className="bi bi-list fs-4"></i>
            </button>
            <NavLink to="/" className="d-flex align-items-center text-decoration-none">
              <img
                src="/images/Kayzonale logo.jpg"
                alt="Kayzonale Logo"
                style={{ maxHeight: '50px' }}
              />
            </NavLink>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-grow-1 d-flex">
            <input
              type="text"
              className="form-control rounded-0 rounded-start"
              placeholder="Search products, brands and categories"
            />
            <button className="btn bg-primary rounded-0 rounded-end">Search</button>
          </div>

          {/* Right: Account, Help, Cart */}
          <div className="d-flex align-items-center gap-3">
            {/* Account Dropdown */}
            <div className="dropdown">
              <button className="btn btn-light dropdown-toggle d-flex align-items-center gap-1" data-bs-toggle="dropdown">
                <i className="bi bi-person fs-5"></i> Account
              </button>
              <ul className="dropdown-menu dropdown-menu-end" style={{ backgroundColor: 'blueviolet' }}>
                <li><NavLink to="/login" className="dropdown-item">Sign In</NavLink></li>
                <li><NavLink to="/register" className="dropdown-item">Register</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <li><NavLink to="/account" className="dropdown-item">My Account</NavLink></li>
                <li><NavLink to="/orders" className="dropdown-item">Orders</NavLink></li>
                <li><NavLink to="/wishlist" className="dropdown-item">Wishlist</NavLink></li>
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

            {/* Cart Button - Now triggers sidebar instead of navigation */}
            <button 
              className="btn btn-light position-relative"
              onClick={() => setIsCartOpen(true)}
            >
              <i className="bi bi-cart fs-5"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="container-fluid d-flex text-dark align-items-center justify-content-between py-2 flex-wrap" style={{ backgroundColor: 'skyblue' }}>
          {/* Categories Nav */}
          <nav className="d-flex gap-3 align-items-center flex-wrap" style={{ marginLeft: '40px' }}>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'text-hotpink fw-bold' : 'text-dark'}`}>Home</NavLink>
            <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'text-hotpink fw-bold' : 'text-dark'}`}>Our services</NavLink>
            <NavLink to="/products page" className={({ isActive }) => `nav-link ${isActive ? 'text-hotpink fw-bold' : 'text-dark'}`}>Our Products</NavLink>
            <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'text-hotpink fw-bold' : 'text-dark'}`}>Shop</NavLink>
          </nav>

          {/* Call info + Express button */}
          <div className="d-flex align-items-center gap-4 flex-wrap" style={{ marginRight: '40px' }}>
            <div className="text-end d-none d-lg-block">
              <div className="small text-muted">CALL US NOW:</div>
              <div className="fw-bold text-pink">0705 783322</div>
            </div>
            <li className="nav-item ms-3">
              <button
                className="btn btn-outline-dark text-white fw-semibold"
                style={{ backgroundColor: 'black', padding: '0.5rem 1.5rem', borderRadius: '0.25rem' }}
                onClick={() => setShowQuoteForm(true)}
              >
                Express Project ?
              </button>
            </li>
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
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </>
  );
};

export default Header;
