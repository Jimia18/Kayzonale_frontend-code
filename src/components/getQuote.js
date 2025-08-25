import React, { useState } from "react";
import emailjs from "emailjs-com";

const RequestQuote = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        "your_service_id", // Replace with your EmailJS service ID
        "your_template_id", // Replace with your EmailJS template ID
        formData,
        "your_public_key" // Replace with your EmailJS public key
      )
      .then(
        () => {
          setStatus("✅ Quote request sent successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            service: "",
            message: "",
          });
        },
        (error) => {
          setStatus("❌ Failed to send. Please try again.");
          console.error(error);
        }
        
      );
  };

  return (
    <div className="d-flex justify-content-center align-items-center py-5 bg-light">
      <div className="quote-form card shadow-lg p-4 rounded-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Request a Quote</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control rounded-3"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control rounded-3"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control rounded-3"
            />
          </div>

          {/* Service */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Service</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="form-select rounded-3"
              required
            >
              <option value="">-- Select a Service --</option>
              <option value="Large Format Printing">Large Format Printing</option>
              <option value="Embroidery">Embroidery</option>
              <option value="Branding">Branding</option>
              <option value="Stationery Printing">Stationery Printing</option>
            </select>
          </div>

          {/* Message */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-control rounded-3"
              rows="4"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-100 py-2 fw-bold text-white"
            style={{
              background: "linear-gradient(135deg, #007bff, #0056d2)",
              border: "none",
              borderRadius: "12px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "linear-gradient(135deg, #0056d2, #0041a8)")}
            onMouseOut={(e) => (e.target.style.background = "linear-gradient(135deg, #007bff, #0056d2)")}
          >
          Submit Request
          </button>

          {/* Status Message */}
          {status && (
            <p className="mt-3 text-center fw-semibold" style={{ color: status.includes("✅") ? "green" : "red" }}>
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RequestQuote;
