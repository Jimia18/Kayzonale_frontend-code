// // import React, { useState } from 'react';
// // import { NavLink } from 'react-router-dom';
// // import GetQuote from '../components/getQuote';  // adjust path if needed

// // export function Header() {
// //   const [showQuoteForm, setShowQuoteForm] = useState(false);

// //   // 🔐 Check if user is logged in by checking token
// //   const isLoggedIn = !!localStorage.getItem('accessToken'); // Or 'accessToken' if that's your key

// //   // 🔓 Logout handler
// //   const handleLogout = () => {
// //     localStorage.removeItem('accessToken'); // Or 'accessToken'
// //     window.location.href = '/'; // Refresh or redirect to homepage
// //   };

// //   return (
// //     <>
// //       {/* Top contact bar */}
// //       <div className="bg-light py-1 border-bottom" style={{ fontSize: '1rem', height: '3rem' }}>
// //         <div className="container d-flex justify-content-between align-items-center ms-auto mb-2 mb-lg-0">
// //           <div>
// //             <i className="bi bi-geo-alt me-2"></i>
// //             Kitgum Stage, Lira City East

// //             <span className="mx-3">|</span>
// //             <i className="fas fa-phone-alt me-2"></i>
// //             <a href='tel:+256777274239' className='header-link'>+256777274239</a>

// //             <span className="mx-3">|</span>
// //             <i className="fas fa-envelope me-2"></i>
// //             <a href='mailto:kayzonaledesigns@gmail.com' className='header-link'>KayzonaleDesigns@gmail.com</a>
// //           </div>
// //           <div>
// //             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark me-3">
// //               <i className="fab fa-facebook-f"></i>
// //             </a>
// //             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark me-3">
// //               <i className="fab fa-twitter"></i>
// //             </a>
// //             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark">
// //               <i className="fab fa-instagram"></i>
// //             </a>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main navbar */}
// //       <nav className="navbar navbar-expand-lg navbar-custom sticky-top shadow" style={{ backgroundColor: '#0f74bb', height: '5rem' }}>
// //         <div className="container">
// //           <NavLink to="/" className="navbar-brand d-flex align-items-center text-white text-decoration-none">
// //             <img
// //               src="/images/Kayzonale logo.jpg"
// //               alt="KayZonale Logo"
// //               className="me-2"
// //               style={{ maxHeight: '60px' }}
// //             />
// //           </NavLink>

// //           <button
// //             className="navbar-toggler"
// //             type="button"
// //             data-bs-toggle="collapse"
// //             data-bs-target="#navbarSupportedContent"
// //             aria-controls="navbarSupportedContent"
// //             aria-expanded="false"
// //             aria-label="Toggle navigation"
// //           >
// //             <span className="navbar-toggler-icon"></span>
// //           </button>

// //           <div className="collapse navbar-collapse" id="navbarSupportedContent">
// //             <ul style={{ fontSize: '1.2rem' }} className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
// //               {/* Nav Links */}
// //               {[
// //                 { to: '/', label: 'Home' },
// //                 { to: '/about', label: 'About us' },
// //                 { to: '/services', label: 'Services' },
// //                 { to: '/portfolio', label: 'Portfolio' },
// //                 { to: '/contact', label: 'Contact Us' }
// //               ].map(({ to, label }) => (
// //                 <li className="nav-item" key={to}>
// //                   <NavLink
// //                     to={to}
// //                     className="nav-link px-3"
// //                     style={({ isActive }) =>
// //                       isActive ? { color: 'hotpink', fontWeight: 'bold' } : { color: 'white' }
// //                     }
// //                   >
// //                     {label}
// //                   </NavLink>
// //                 </li>
// //               ))}

// //               {/* Get a Quote Button */}
// //               <li className="nav-item ms-3">
// //                 <button
// //                   onClick={() => setShowQuoteForm(true)}
// //                   className="btn btn-danger text-white"
// //                   style={{ padding: '0.5rem 1.5rem', borderRadius: '0.25rem' }}
// //                 >
// //                   Get a Quote
// //                 </button>
// //               </li>

// //               {/* Auth buttons */}
// //               <li className="nav-item ms-3">
// //                 {!isLoggedIn ? (
// //                   <>
// //                     <NavLink to="/admin/admin-login" className="btn btn-outline-light me-2">Login</NavLink>
// //                     <NavLink to="/admin/admin-signup" className="btn btn-warning text-dark">Sign Up</NavLink>
// //                   </>
// //                 ) : (
// //                   <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
// //                 )}
// //               </li>
// //             </ul>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Quote Modal */}
// //       <GetQuote show={showQuoteForm} onClose={() => setShowQuoteForm(false)} />
// //     </>
// //   );
// // }


// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';

// export function Header() {
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const total = cart.reduce((sum, item) => sum + item.qty, 0);
//     setCartCount(total);
//   }, []);

//   const scrollToExpressForm = () => {
//     const section = document.getElementById('express-form');
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <>
//       {/* Entire Fixed Header */}
//       <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1030, backgroundColor: '#fff' }}>
//         {/* Top Strip */}
//         <div className="bg-dark text-white py-2">
//           <div className="container d-flex justify-content-center align-items-center gap-3 flex-wrap">
//             <span>🔥 Free delivery on all orders above 500K+</span>
//             <button className="btn btn-light btn-sm fw-bold px-3 py-1">Shop Now</button>
//           </div>
//         </div>

//         {/* Logo + Main Nav */}
//         <div className="bg-white py-3 shadow-sm border-bottom">
//           <div className="container d-flex flex-wrap align-items-center justify-content-between">
//             {/* Logo */}
//             <NavLink to="/" className="d-flex align-items-center text-decoration-none">
//               <img
//                 src="/images/Kayzonale logo.jpg"
//                 alt="Kayzonale Logo"
//                 style={{ maxHeight: '60px' }}
//               />
//             </NavLink>

//             {/* Center Nav */}
//             <ul className="nav justify-content-center flex-grow-1 fw-semibold fs-6">
//               {[
//                 { to: '/', label: 'Home' },
//                 { to: '/calendars', label: 'Calendars & Gifts' },
//                 { to: '/banners', label: 'Banners' },
//                 { to: '/deals', label: 'Deals', hot: true },
//                 { to: '/shop', label: 'Shop' }
//               ].map(({ to, label, hot }) => (
//                 <li className="nav-item position-relative mx-2" key={to}>
//                   <NavLink
//                     to={to}
//                     className={({ isActive }) =>
//                       `nav-link ${isActive ? 'text-hotpink fw-bold' : 'text-dark'}`
//                     }
//                   >
//                     {label}
//                   </NavLink>
//                   {hot && (
//                     <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill" style={{ fontSize: '0.6rem' }}>
//                       HOT
//                     </span>
//                   )}
//                 </li>
//               ))}
//             </ul>

//             {/* Right Icons */}
//             <div className="d-flex align-items-center gap-4">
//               <i className="bi bi-search fs-5 text-dark"></i>

//               {/* Cart */}
//               <div className="position-relative">
//                 <NavLink to="/cart" className="text-dark">
//                   <i className="bi bi-bag fs-5"></i>
//                   {cartCount > 0 && (
//                     <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
//                       {cartCount}
//                     </span>
//                   )}
//                 </NavLink>
//               </div>

//               {/* Call */}
//               <div className="text-end">
//                 <div style={{ fontSize: '0.75rem', color: '#888' }}>CALL US NOW:</div>
//                 <div className="fw-bold" style={{ color: 'hotpink' }}>0705 783322</div>
//               </div>

//               {/* Express */}
//               <button className="btn express-btn fw-semibold" onClick={scrollToExpressForm}>
//                 Express Project ?
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Contact Us Row */}
//         <div className="bg-white border-top py-3">
//           <div className="container text-center">
//             <NavLink
//               to="/contact"
//               className={({ isActive }) =>
//                 `nav-link ${isActive ? 'text-hotpink fw-bold' : 'text-dark'}`
//               }
//             >
//               Contact Us
//             </NavLink>
//           </div>
//         </div>
//       </div>

//       {/* Offset below the fixed header */}
//       <div style={{ paddingTop: '190px' }}></div>
//     </>
//   );
// }


import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    setCartCount(total);
  }, []);

  const scrollToExpressForm = () => {
    const section = document.getElementById('express-form');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <div className="container-fluid d-flex align-items-center justify-content-between gap-3 flex-wrap py-2"style={{backgroundColor: 'lightblue'}}>

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
            <button className="btn btn-warning rounded-0 rounded-end">Search</button>
          </div>

          {/* Right: Account, Help, Cart */}
          <div className="d-flex align-items-center gap-3">
            {/* Account Dropdown */}
            <div className="dropdown">
              <button className="btn btn-light dropdown-toggle d-flex align-items-center gap-1" data-bs-toggle="dropdown">
                <i className="bi bi-person fs-5"></i> Account
              </button>
              <ul className="dropdown-menu dropdown-menu-end"style={{backgroundColor:'blueviolet'}}>
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

            {/* Cart Icon */}
            <NavLink to="/cart" className="btn btn-light position-relative">
              <i className="bi bi-cart fs-5"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>

        {/* Bottom Nav (optional links like Express, Call Info, etc.) */}
        <div className="container-fluid d-flex text-dark align-items-center justify-content-between py-2 flex-wrap"style={{backgroundColor:'skyblue'}}>
          {/* Categories Nav */}
          <nav className="d-flex gap-3 align-items-center flex-wrap"style={{marginLeft:'40px'}}>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'text-hotpink fw-bold' : 'text-dark'}`}>Home</NavLink>
            <NavLink to="/calendars" className={({ isActive }) => `nav-link ${isActive ? 'text-hotpink fw-bold' : 'text-dark'}`}>Calendars & Gifts</NavLink>
            <NavLink to="/banners" className={({ isActive }) => `nav-link ${isActive ? 'text-hotpink fw-bold' : 'text-dark'}`}>Banners</NavLink>
            <NavLink to="/deals" className={({ isActive }) => `nav-link ${isActive ? 'text-hotpink fw-bold' : 'text-dark'}`}>
              Deals <span className="badge bg-danger ms-1">HOT</span>
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'text-hotpink fw-bold' : 'text-dark'}`}>Shop</NavLink>
          </nav>

          {/* Call info + Express button */}
          <div className="d-flex align-items-center gap-4 flex-wrap" style={{marginRight:'40px'}}>
            <div className="text-end d-none d-lg-block">
              <div className="small text-muted">CALL US NOW:</div>
              <div className="fw-bold text-pink">0705 783322</div>
            </div>
            <button className="btn btn-outline-dark text-white fw-semibold"style={{backgroundColor:'black'}} onClick={scrollToExpressForm}>
              Express Project ?
            </button>
          </div>
        </div>

       
      </div>

      {/* Offset for fixed header */}
      <div style={{ paddingTop: '230px' }}></div>
    </>
  );
};

export default Header;
