import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './App.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/home';
import About from './pages/about';
import Portfolio from './pages/portfolio';
import ContactPage from './pages/contact';
import ServicesPage from './pages/services';

import AddUser from './pages/admin/addUser';
import ShowUsers from './pages/admin/showUsers';
import Orders from './pages/admin/orders';
// import Payments from './pages/admin/Payments';
// import Clients from './pages/admin/Clients';
// import Services from './pages/admin/Services';
// import Projects from './pages/admin/Projects';
import AdminDashboard from './pages/admin/adminDashboard';
import DashboardHome from './pages/admin/adminHome';


import { Header } from './components/header';
import Footer from './components/footer';
import FloatingWhatsApp from './components/floatingWhatsap';

const Layout = () => {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Header />}
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />

        {/* Admin routes */}
          <Route path="/" element={<DashboardHome />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-user" element={<AddUser />} />
          <Route path="/admin/show-users" element={<ShowUsers />} />
          <Route path="/admin/orders" element={<Orders />} />
          {/* <Route path="/admin/payments" element={<Payments />} />
          <Route path="/admin/clients" element={<Clients />} /> */}
          {/* <Route path="/admin/services" element={<Services />} /> */}
          {/* <Route path="/admin/projects" element={<Projects />} /> */}
        {/* <Route path="/admin/myProfile" element={<MyProfile />} /> */}
      </Routes>
      { !hideLayout ? <FloatingWhatsApp /> : null }
      { !hideLayout ? <Footer /> : null }
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
