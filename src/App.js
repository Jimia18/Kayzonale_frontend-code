// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import HomePage from './pages/home';
import About from './pages/about';
import Portfolio from './pages/portfolio';
import ContactPage from './pages/contact';
import ServicesPage from './pages/services';
import ShopPage from './pages/shop';
import Products from './pages/products';

// Admin Pages
import UsersPage from './admin/showUsers';
import OrderManagement from './admin/orderManagement';
import ClientManagement from './admin/clientManagement';
import ServiceManagement from './admin/serviceManagement';
import ProjectManagement from './admin/projectManagement';
import AdminDashboard from './admin/adminDashboard';
import DashboardProducts from './admin/productManagement';

// Cart & Auth
import { CartProvider } from './components/cartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/floatingWhatsap';
import Login from './components/Login';
import Register from './components/Register';
import RequestQuote from './components/getQuote';

// Checkout & Payments
import CartPage from './pages/cartPage';
import CheckoutPaymentsPage from './pages/CheckoutPaymentsPage'
import ThankYouPage from './pages/ThankYou'
import FaqsPage from './pages/faq';
import ClientProfilePage from './pages/ClientsProfile';

const Layout = () => {
  const location = useLocation();
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<Products />} />

        {/* Cart Flow */}
        <Route path='/cartPage' element={<CartPage/>}/>
        <Route path="/CheckoutPaymentsPage" element={<CheckoutPaymentsPage />} />
        <Route path='/ThankYou' element={<ThankYouPage/>}/>

        {/*Faqs*/}
        <Route path='/faq' element = {<FaqsPage/>}/>
        <Route path="/getQuote" element={<RequestQuote />} />


        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/ClientsProfile' element={<ClientProfilePage/>}/>

        {/* Protected Admin Routes */}
        <Route path="/admin"element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>}/>
        <Route path="/admin/showUsers"element={<ProtectedRoute requiredRole="admin"><UsersPage /></ProtectedRoute>}/>
        <Route path="/admin/clientManagement"element={<ProtectedRoute requiredRole="admin"><ClientManagement /></ProtectedRoute>}/>
        <Route path="/admin/orderManagement"element={<ProtectedRoute requiredRole="admin"><OrderManagement /></ProtectedRoute>}/>
        <Route path="/admin/serviceManagement"element={<ProtectedRoute requiredRole="admin"><ServiceManagement /></ProtectedRoute>}/>
        <Route path="/admin/projectManagement"element={<ProtectedRoute requiredRole="admin"><ProjectManagement /></ProtectedRoute> }/>
        <Route path="/admin/productManagement"element={<ProtectedRoute requiredRole="admin"><DashboardProducts /></ProtectedRoute>}/>
      </Routes>

      {!hideLayout && <FloatingWhatsApp />}
      {!hideLayout && <Footer />}
    </>
  );
};

function App() {
  return (


 
    <CartProvider>
      <Router>
        <Layout />
        <ToastContainer position="top-right" autoClose={2000} />
      </Router>
    </CartProvider>
  );
}

export default App;
