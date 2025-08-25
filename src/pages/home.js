import React from 'react';
import '../styles/home.css';
//import GetQuote from '../components/getQuote';
import HeroSliderhome from '../components/Herosliderhome';
//import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/testimonials';
import FeaturedProducts from '../components/FeaturedProducts';

const HomePage = () => {
  //const [showQuoteForm, setShowQuoteForm] = useState(false);

  return (
    <div className="text-gray-800 font-sans ">
        <main className="flex-grow-1">

      {/* Hero Section */}
      <HeroSliderhome  />

      {/* Featured Products Section */}
      <FeaturedProducts/>

      {/* About Section
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
      </section> */}

      {/* Interactive Service Highlight Section */}
<section className="position-relative overflow-hidden py-1 text-dark rounded-shadow " 
style={{ background: 'linear-gradient(-45deg, #6faaddff, #ae7588aa, #b6ecefff, #b1aea9ff)', backgroundSize: '400% 400%', animation: 'gradientBG 15s ease infinite' }}>
  <div className="container">
    <div className="row align-items-center">

      {/* Left Cards */}
      <div className="col-md-6">
        <div className="row g-4">

          <div className="col-6">
            <div className="p-4 bg-white rounded shadow h-100 interactive-card text-center">
              <img src="/images/printerIcon.png" alt="Print" width="60" className="mb-3" />
              <h5 className="fw-semibold mb-2">Printing Services</h5>
              <p className="text-muted small">
                Print, flyer, and pamphlet solutions with a legacy of quality.
              </p>
            </div>
          </div>

          <div className="col-6">
            <div className="p-4 bg-white rounded shadow h-100 interactive-card text-center">
              <img src="/images/LargeFomatPrinter.png" alt="Scan" width="60" className="mb-3" />
              <h5 className="fw-semibold mb-2">Large Format Printing</h5>
              <p className="text-muted small">
                For banners, posters, backdrops, signage, and more. 
                Bold, high-resolution prints made to stand out indoors or outdoors.
              </p>
            </div>
          </div>
          <div className="col-6">
            <div className="p-4 bg-white rounded shadow h-100 interactive-card text-center">
              <img src="/images/photocopier.png" alt="Print" width="60" className="mb-3" />
              <h5 className="fw-semibold mb-2">Stationary Design Services</h5>
              <p className="text-muted small">
                Photocopying and Scanning services for documents, IDs, and forms. Clear, 
                high-quality results in both black & white and color.
              </p>
            </div>
          </div>
          <div className="col-6">
            <div className="p-4 bg-white rounded shadow h-100 interactive-card text-center">
              <img src="/images/embroidery.png" alt="Print" width="60" className="mb-3" />
              <h5 className="fw-semibold mb-2">Embroidery Services</h5>
              <p className="text-muted small">
                Embroidery design solutions for uniforms and merchandise. 
                High-quality stitching to represent your brand.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Right Text + Button */}
      <div className="col-md-6 text-center text-md-start " style={{paddingLeft:'4rem',paddingTop:'6rem'}}>
        <h6 className="text-danger text-uppercase fw-bold mb-2" style={{ fontSize: '1rem' }}>
          Printing Made Easy
        </h6>
        <h2 className="fw-bold display-5 mb-3" style={{ fontSize: '2.5rem' }}>
          Fast and Quality <br /> Service
        </h2>
        <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
          More than duplicates — we do it right! From flyers to banners, our high-quality
          print services deliver what your brand deserves.
        </p>
        <a href="/services" className="btn btn-danger btn-lg shadow px-4 py-2 i" style={{ fontSize: '1.1rem' }}>
          Learn More
        </a>
      </div>

    </div>
  </div>
</section>

<section className="py-5 position-relative" style={{
  background: 'linear-gradient(to right, #1591c3ff, #92ccd4ff, #cee9ecff)',
  overflow: 'hidden'
}}>
  <div className="container">
    <div className="row align-items-center justify-content-between text-center text-md-start">

      {/* Left Product Image */}
      <div className="col-md-3 mb-4 mb-md-0">
        <img src="/images/abt.png" alt="Package" className="img-fluid" style={{ maxHeight: '320px' }} />
      </div>

      {/* Center Text + CTA */}
      <div className="col-md-6" style={{paddingLeft: '6rem'}}>
        <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
          Let’s brand you <br /> <span className="text-uppercase" style={{ color: '#e6007e' }}>NOW…</span>
        </h2>
        <p className="mb-4 fs-5">Printed and delivered on demand!</p>
        <a href="/shop" className="btn btn-primary px-4 py-2 fs-5" style={{ background: '#e6007e', border: 'none' }}>
          Shop Now &rarr;
        </a>
      </div>

      {/* Right Product Image */}
      <div className="col-md-3 mt-4 mt-md-0">
        <img src="/images/IMG-20250724-WA0039.jpg" alt="T-shirt" className="img-fluid" style={{ maxHeight: '200px' }} />
      </div>

    </div>
  </div>

</section>

<section className="py-5 mb-5">
        <Testimonials />
</section>

      {/* Portfolio Section */}
      {/* <section className="text-white text-center portfolio-intro d-flex align-items-center" style={{ height: '300px', position: 'relative' }}>
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
      </section> */}

      {/* Quote Section */}
      <section className="py-5 text-center fst-italic">
        <h4 className="fw-bold">
          <span className="text-primary">QUALITY</span>{' '}
          <span>PRINT AND DESIGN MADE</span>{' '}
          <span className="text-danger">AFFORDABLE</span>
        </h4>
      </section>
      </main>

      

    </div>
  );
};

export default HomePage;
