import React from 'react';
import '../styles/about.css'; // External styles for custom overlay

const AboutPage = () => {
  return (
    <div>

      {/* Hero Section */}
      <section
        className="py-5 text-center text-white"
        style={{ background: "linear-gradient(135deg, #e3eef3ff 0%, #d6e8ebff 100%)" }}
      >
        <h1 className="fw-bold mb-2">About Us</h1>
        <p className="fs-5">
          <a href="/" className="text-white text-decoration-none opacity-75">
            Home
          </a>{" "}
          — <span className="fw-semibold">About Us</span>
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="bg-white text-center p-4 shadow rounded h-100">
              <img src="/images/Vision.png" alt="Vision" className="mb-3" style={{ height: '60px' }} />
              <h5 className="fw-bold">Our Vision:</h5>
              <p className="text-muted">
                To be a globally recognized printing and branding company, known for exceptional and meaningful
                experiences, excellent customer service, and innovative solutions.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="bg-white text-center p-4 shadow rounded h-100">
              <img src="/images/5885.jpg" alt="Mission" className="mb-3" style={{ height: '60px' }} />
              <h5 className="fw-bold">Our Mission:</h5>
              <p className="text-muted">
                Together with clients to develop unique and trusted branding and printing solutions that meet
                their needs, while building a sustainable, responsible, and creative future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-5" style={{ backgroundColor: '#d5e3f1' }}>
        <div className="container text-center">
          <h3 className="fw-bold mb-4">Our Team</h3>
          <p className="mb-5 mx-auto" style={{ maxWidth: '600px' }}>
           Our team specializes in a diverse range of professional printing and branding services, combining creativity, precision,
           and experience to bring your vision to life.
          </p>

          <div className="row justify-content-center g-4">
            {[1, 2, 3,4].map((_, i) => (
              <div key={i} className="col-md-4">
                <div className="bg-white p-3 rounded shadow text-center h-100">
                  <img src="/images/IMG-20250724-WA0039.jpg" alt="Team Member" style={{ height: '80px' }} className="mb-3" />
                  <h6 className="fw-bold">Atoo Kay Simporoza</h6>
                  <p className="mb-1">Founder & CEO</p>
                  <p className="mb-1" style={{ fontSize: '0.9rem', paddingBottom: '0.5rem' }}>+256 777 274 639</p>
                  <p className="mb-0" style={{ fontSize: '0.9rem', paddingBottom: '0.5rem' }}>kayzonaledesigns@gmail.com</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Priority Section */}
<section className="py-5">
  <div className="container">
    <div className="row align-items-center">
      
      {/* Text Column */}
      <div className="col-md-6">
        <h2 className="fw-bold mb-3 text-start">
          WHERE WE BELIEVE YOU ARE A <span className="text-danger">PRIORITY</span>
        </h2>
        <p className="text-muted text-start" style={{ maxWidth: '100%' }}>
          At Kayzonale Designs, you come first. We focus on quality, reliability, and making sure your
          printing needs are met on time, every time.
        </p>
      </div>

      {/* Image Column */}
      <div className="col-md-6 text-center">
        <img
          src="/images/partner.jpeg"
          alt="priority"
          className="img-fluid"
          style={{ maxHeight: '300px', width: '50%', objectFit: 'center' }}
        />
      </div>
    </div>
  </div>
</section>


    </div>
  );
};

export default AboutPage;
