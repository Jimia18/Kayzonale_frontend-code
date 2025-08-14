import React from 'react';


const GetQuote = ({ show, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Quote request submitted!');
    onClose(); // close the modal
  };

  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999 }}
      onClick={onClose} // CLOSE on outside click
    >
      <div
        className="bg-white p-4 rounded shadow"
        style={{ maxWidth: '600px', width: '90%' }}
        onClick={(e) => e.stopPropagation()} // PREVENT closing when clicking inside form
      >
         {/* Logo on top */}
        <div className="quote-logo">
          <img
            src="/images/Kayzonale logo.jpg"
            alt="Kayzonale Logo"
            style={{ width: '90px', height: 'auto' }}
          />
        </div>

        <h4 className="mb-3 text-center">Quotation Request Form</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Full Name" required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email Address" required />
          </div>
          <div className="mb-3">
            <input type="tel" className="form-control" placeholder="Phone Number" required />
          </div>
          <div className="mb-3">
            <select className="form-control" required>
              <select value="">Select Service</select>
              <option>Business Card design</option>
              <option>Stationery Services</option>
              <option>Large Format Printing</option>
              <option>Plotting</option>
              <option>Brand Identity Design</option>
              <option>Embroidery</option>
              <option></option>
            </select>
          </div>
          <div className="mb-3">
            <input type="number" className="form-control" placeholder="Quantity" required />
          </div>
          <div className="mb-3">
            <input type="date" className="form-control" placeholder="Preferred Delivery Date" />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Job Description or Special Instructions"
            ></textarea>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetQuote;
