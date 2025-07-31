import React, { useState } from 'react';
import '../styles/home.css';
import GetQuote from '../components/getQuote';
import HeroSlider from '../components/HeroSlider';

const HomePage = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <div className="text-gray-800 font-sans">

      {/* Hero Section */}
      <HeroSlider onQuoteClick={() => setShowQuoteForm(true)} />

      {/* About Section */}
      <section className="py-5 bg-info bg-opacity-25 text-dark pt-5 pb-3">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="fw-bold mb-3">
                The Story Of <span className="text-danger">Our Journey</span>
              </h2>
              <p style={{ fontSize: '1.3rem' }} className="mb-4">
                A quality printing and promotional products company.
                Full service printing experience at the point when quality truly matters.
                Taking your needs seriously. Bringing your print to life. The right kind of solutions.
              </p>
              <a
                style={{ fontSize: "1.5rem", padding: "1rem 3rem" }}
                href="/about"
                className="btn btn-primary"
              >
                Learn More
              </a>
            </div>

            <div className="col-md-6 text-center">
              <img src="/images/images.jpeg" alt="Journey" className="img-fluid" />
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 style={{ fontSize: '2.5rem' }} className="fw-bold">
            Our Premier <span className="text-danger">Services</span>
          </h2>
          <p style={{ fontSize: '1.3rem' }} className="mb-5">
            <strong>We offer a wide range of printing and branding services</strong>:
          </p>

          <div className="row g-4 justify-content-center">

            <div className="col-md-4 col-sm-6">
              <div>
                <img src="/images/printerIcon.png" alt="Print Solutions" height="50" className="mb-3" />
                <h6 className="fw-bold">Print Solutions</h6>
                <p className="text-muted mb-4">
                  Business cards, brochures, flyers, calendars and banners for all your marketing needs
                </p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div>
                <img src="/images/photocopier.png" alt="Stationery" height="50" className="mb-3" />
                <h6 className="fw-bold">Stationery Design Services</h6>
                <p className="text-muted mb-4">
                  Photocopying and Scanning services for documents, IDs, and forms.
                  Whether for personal or business use,
                  we deliver clear, high-quality results in both black & white and color.
                </p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div>
                <img src="/images/LargeFomatPrinter.png" alt="Large Format" height="50" className="mb-3" />
                <h6 className="fw-bold">Large Format Printing</h6>
                <p className="text-muted mb-4">
                  For banners, posters, backdrops, signage, and more. Ideal for events, advertising,
                  and branding, our prints are bold, high resolution, and made to stand out indoors or outdoors.
                </p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div>
                <img src="/images/plotting.png" alt="Creative" height="50" className="mb-3" />
                <h6 className="fw-bold">Plotting</h6>
                <p className="text-muted mb-4">
                  For architectural plans, engineering drawings, and other technical documents.
                  Whether black & white or color, our plots are clear, accurate, and ready for presentation or submission
                </p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div>
                <img src="/images/branding.jpeg" alt="Branding" height="50" className="mb-3" />
                <h6 className="fw-bold">Brand Identity Design</h6>
                <p className="text-muted mb-4">
                  We help build your brand identity through expert design services logos,color schemes, typography,
                  and marketing materials that communicate your unique story and make a lasting impression.
                </p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div>
                <img src="/images/embroidery.png" alt="Packaging" height="50" className="mb-3" />
                <h6 className="fw-bold">Embroidery</h6>
                <p className="text-muted mb-4">
                  Embroidery Design Solutions
                  For all your uniform and merchandise designs
                </p>
              </div>
            </div>

          </div>

          <div className="mt-5">
            <a style={{ fontSize: "1.5rem", padding: "1rem 3rem" }} href="/services" className="btn btn-primary">
              Explore our Services
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="text-white text-center portfolio-intro d-flex align-items-center" style={{ height: '300px', position: 'relative' }}>
        <div className="overlay position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.5)', top: 0, left: 0, zIndex: 1 }}></div>
        <div className="container position-relative z-2">
          <h2 className="display-4 fw-bold">Our Portfolio</h2>
          <p className="lead text-white">
            See our work in action! Our extensive portfolio showcases successful
            projects ranging from business cards and marketing materials
            to political campaign prints and web design.
          </p>
        </div>
      </section>

      <section className="container portfolio-content py-5">
        <div className="row text-center mb-4">
          <div className="col-md-3">
            <img src="/images/business cards.jpeg" alt="Project 1" className="img-fluid rounded shadow"style={{maxHeight:'240px'}} />
            <h5 className="mt-3 fw-bold">Business Cards</h5>
            <p className="text-muted">Custom-designed professional cards for branding impact.</p>
          </div>
          <div className="col-md-3">
            <img src="/images/Branded t-shirts.jpg" alt="Project 2" className="img-fluid rounded shadow"style={{maxHeight:'240px'}} />
            <h5 className="mt-3 fw-bold">Branded T-Shirts</h5>
            <p className="text-muted">High-quality fabric with lasting print for your brand.</p>
          </div>
          <div className="col-md-3">
            <img src="/images/flier and posters.jpg" alt="Project 3" className="img-fluid rounded shadow"style={{maxHeight:'240px'}} />
            <h5 className="mt-3 fw-bold">Flyers & Brochures</h5>
            <p className="text-muted">Eye-catching layouts for marketing and promotion.</p>
          </div>
          <div className="col-md-3">
            <img src="/images/invoices receipts.jpg" alt="Project 4" className="img-fluid rounded shadow" style={{maxHeight:'240px'}} />
            <h5 className="mt-3 fw-bold">Banners & Signage</h5>
            <p className="text-muted">Large-format prints ideal for outdoor and indoor visibility.</p>
          </div>
        </div>

        <div className="text-center">
          <a style={{ fontSize: "1.5rem", padding: "1rem 3rem" }} href="/portfolio" className="btn btn-primary">
            Explore Full Portfolio
          </a>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-5 text-center fst-italic ">
        <h4 className="fw-bold">
          <span className="text-primary">QUALITY</span>{' '}
          <span>PRINT AND DESIGN MADE</span>{' '}
          <span className="text-danger">AFFORDABLE</span>
        </h4>
      </section>

      {/* GetQuote Modal */}
      <GetQuote show={showQuoteForm} onClose={() => setShowQuoteForm(false)} />

    </div>
  );
};

export default HomePage;
