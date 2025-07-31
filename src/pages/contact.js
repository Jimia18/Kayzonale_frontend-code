import React, { useState } from 'react';
import '../styles/contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate an API call
    setTimeout(() => {
      alert(`Thanks, ${formData.name}! Your request has been received.`);
      setIsSubmitting(false);
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    }, 2000);
  };

  return (
    <div className="contact-page bg-light py-5 pt-5 pb-3 ">
      <div className="contact-hero-image"></div>

      <section className="py-5 contact-section bg-lightblue rounded shadow">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0 text-dark">
            <h3 className="fw-bold mb-3">
              Contact <span className="text-danger">Us</span>
            </h3>
            <p>We're here to help! Reach out to us for quotes, inquiries, or custom project requests.</p>
            <p><strong>Address:</strong> Kitgum stage, Lira city East</p>
            <p><strong>Phone:</strong> <a href="tel:+256777274239" className="text-dark">0777274239</a></p>
            <p><strong>Hours:</strong> Monday – Friday | 8 AM - 5 PM</p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:kayzonaledesigns@gmail.com" className="text-dark">
                Kayzonaledesigns@gmail.com
              </a>
            </p>
          </div>

          <div className="col-md-6">
            <form className="container bg-white p-4 rounded shadow" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="YOUR NAME"
                className="form-control mb-3"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="PHONE NUMBER"
                className="form-control mb-3"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS"
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="service"
                placeholder="SERVICE NEEDED"
                className="form-control mb-3"
                value={formData.service}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                rows="4"
                placeholder="MESSAGE"
                className="form-control mb-3"
                value={formData.message}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Request a Quote Now'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-5 text-center fst-italic ">
        <h4 className="fw-bold">
          <span className="text-primary">QUALITY</span>{' '}
          <span>PRINT AND DESIGN MADE</span>{' '}
          <span className="text-danger">AFFORDABLE</span>
        </h4>
      </section>
    </div>
  );
};

export default ContactPage;
