import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GetQuote from '../components/getQuote';  // adjust path if needed

export function Header() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <>
      {/* Top contact bar */}
      <div className="bg-light py-1 border-bottom" style={{ fontSize: '1rem', height: '3rem' }}>
        <div className="container d-flex justify-content-between align-items-center ms-auto mb-2 mb-lg-0">
          <div>
            <i className="bi bi-geo-alt me-2"></i>
            Kitgum Stage, Lira City East

            <span className="mx-3">|</span>
            <i className="fas fa-phone-alt me-2"></i>
            <a href='tel:+256 777 274 639'className='header-link'>+256777274239</a>

            <span className="mx-3">|</span>
            <i className="fas fa-envelope me-2"></i>
            <a href = 'malito:kayzonaledesigns@gmail.com' className='header-link'>KayzonaleDesigns@gmail.com</a>
            
          </div>
          <div>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark me-3">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark me-3">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="navbar navbar-expand-lg navbar-custom sticky-top shadow" style={{ backgroundColor: '#0f74bb', height:'5rem' }}>
        <div className="container">
          <NavLink to="/" className="navbar-brand d-flex align-items-center text-white text-decoration-none">
            <img
              src="/images/Kayzonale logo.jpg"
              alt="KayZonale Logo"
              className="me-2"
              style={{ maxHeight: '60px' }}
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul style={{ fontSize: '1.2rem' }} className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {/* Nav Links */}
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About us' },
                { to: '/services', label: 'Services' },
                { to: '/portfolio', label: 'Portfolio' },
                { to: '/contact', label: 'Contact Us' }
              ].map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    to={to}
                    className="nav-link px-3"
                    style={({ isActive }) =>
                      isActive ? { color: 'hotpink', fontWeight: 'bold' } : { color: 'white' }
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}

              {/* Get a Quote Button (opens modal) */}
              <li className="nav-item ms-3">
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="btn btn-danger text-white"
                  style={{ padding: '0.5rem 1.5rem', borderRadius: '0.25rem' }}
                >
                  Get a Quote
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Render GetQuote Modal */}
      <GetQuote show={showQuoteForm} onClose={() => setShowQuoteForm(false)} />
    </>
  );
}
