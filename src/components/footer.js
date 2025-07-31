// components/Footer.js
import React from 'react';
import '../styles/footer.css'; // Link to external CSS

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="text-dark  py-5 bg-info bg-opacity-25 pt-5 pb-3">
        <div className="row text-start">
          {/* Terms and Policies */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Terms and Policies</h6>
            <ul className="list-unstyled">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Cookies Policy</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Give Us a call</h6>
            <p>
              <a href="tel:+256777274239" className="footer-link">
                📞 0777274239
              </a>
            </p>
            <h6 className="fw-bold mt-3">Write to Us</h6>
            <p>
              <a href="mailto:kayzonaledesigns@gmail.com" className="footer-link">
                📧 kayzonaledesigns@gmail.com
              </a>
            </p>
          </div>

          {/* Address */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Address</h6>
            <p>📍 Kitgum Stage, Lira City East</p>
          </div>
        </div>

        <hr />

        {/* Copyright */}
        <div className="text-center mt-3">
          <small>&copy; {new Date().getFullYear()} Kayzonale Designs and Enterprises</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
