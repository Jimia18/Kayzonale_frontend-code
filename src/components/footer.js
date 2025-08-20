import React from 'react';
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="custom-footer bg-info bg-opacity-25 pt-5 pb-5 mt-5 mb-4">

      {/* Social Media Section */}
      <div className="footer-social text-center pb-4 d-flex justify-content-center gap-4 flex-wrap">
        {[
          { href: 'https://facebook.com', icon: faFacebook, label: 'Facebook' },
          { href: 'https://twitter.com', icon: faTwitter, label: 'Twitter' },
          { href: 'https://instagram.com', icon: faInstagram, label: 'Instagram' },
          { href: 'https://youtube.com', icon: faYoutube, label: 'YouTube' },
          { href: 'https://tiktok.com', icon: faTiktok, label: 'Tiktok' },
        ].map(({ href, icon, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link hover-toggle">
            <span className="text">{label}</span>
            <FontAwesomeIcon icon={icon} className="icon" />
          </a>
        ))}
      </div>

      {/* Main Content */}
      <div className="container-fluid px-3 pt-0">
        <div className="row gy-5 gx-5">

          {/* Logo & Contact Info */}
          <div className="col-md-3 text-center text-md-start">
            <img
              src="/images/Kayzonale logo.jpg"
              alt="Kayzonale Logo"
              className="img-fluid mb-3"
              style={{ maxWidth: '150px', height: 'auto' }}
            />
            <p className="mb-1"><a href="mailto:info@kayzonaledesigns.com"> 📧  Kayzonaledesigns@gmail.com</a></p>
            <a href="tel:+256777274239" className="footer-link"> 📞 +256 (0) 777274239</a><br />
            <p className="mb-0 fs-6"> 📍 Kitgum Stage, Lira City</p>
          </div>

          {/* Information */}
          <div className="col-md-2 text-center text-md-start">
            <h6 className="fw-bold fs-4">Information</h6>
            <ul className="list-unstyled fs-6">
              <li><a href="/about" className="footer-link">About us</a></li>
              <li><a href="/portfolio" className="footer-link">Portfolio</a></li>
              <li><a href="/contact" className="footer-link">Contact Us</a></li>
              <li><a href="/privacy-policy" className="footer-link">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-md-2 text-center text-md-start">
            <h6 className="fw-bold fs-4">Services</h6>
            <ul className="list-unstyled fs-6">
              <li><a href="/brand-packs" className="footer-link">Brand Pack Packages</a></li>
              <li><a href="/faq" className="footer-link">Frequently Asked Questions</a></li>
              <li><a href="/request-quote" className="footer-link">Request a Quote</a></li>
              <li><a href="/customize-design" className="footer-link">Customize Design</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-md-2 text-center text-md-start px-">
            <h6 className="fw-bold fs-4">Categories</h6>
            <ul className="list-unstyled fs-6">
              <li><a href="/brochures" className="footer-link">Brochures in Uganda</a></li>
              <li><a href="/pullup-banners" className="footer-link">Pullup Banners</a></li>
              <li><a href="/promotional-products" className="footer-link">Promotional Products</a></li>
              <li><a href="/valentine-gifts" className="footer-link">Valentine Gifts</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Divider */}
      <hr className="my-0" />

      {/* Footer Bottom */}
      <div className="text-center small-text mt-3">
        <small>&copy; {new Date().getFullYear()} Kayzonale Designs and Enterprises</small>
      </div>
    </footer>
  );
};

export default Footer;
