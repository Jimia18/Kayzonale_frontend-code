import React from 'react';
import '../styles/portfolio.css'; // Optional: for custom styles
import HeroSliderPortfolio from '../components/HeroSliderPortfolio';

const PortfolioPage = () => {
  return (
          
    <>
      {/* Hero Section */}
      <section style={{ height: '100vh', paddingTop:'0rem', paddingBottom:'0rem' }}>
        <HeroSliderPortfolio />
      </section>

      {/* Projects Section */}
      <section className="container py-5">
        <div className="row text-center">

          {/* Project 1 */}
          <div className="col-md-3 mb-4">
            <img src="/images/business cards.jpeg" alt="Business Cards" className="img-fluid rounded shadow" />
            <h5 className="mt-3 fw-bold">Business Cards</h5>
            <p className="text-muted">Custom-designed professional cards for branding impact.</p>
          </div>

          {/* Project 2 */}
          <div className="col-md-3 mb-4">
            <img src="/images/Branded t-shirts.jpg" alt="T-Shirts" className="img-fluid rounded shadow" />
            <h5 className="mt-3 fw-bold">Branded T-Shirts</h5>
            <p className="text-muted">High-quality fabric with lasting print for your brand.</p>
          </div>

          {/* Project 3 */}
          <div className="col-md-3 mb-4">
            <img src="/images/flier.jpg" alt="Flyers" style={{maxHeight:'19rem', maxWidth:'40rem'}} className="img-fluid rounded shadow" />
            <h5 className="mt-3 fw-bold">Flyers & Brochures</h5>
            <p className="text-muted">Eye-catching layouts for marketing and promotion.</p>
          </div>

          {/* Project 4 */}
          <div className="col-md-3 mb-4">
            <img src="/images/project4.jpg" alt="Banners" className="img-fluid rounded shadow" />
            <h5 className="mt-3 fw-bold">Banners & Signage</h5>
            <p className="text-muted">Large-format prints ideal for visibility.</p>
          </div>

          {/* Project 5 */}
          <div className="col-md-3 mb-4">
            <img src="/images/project5.jpg" alt="Branded Mugs" className="img-fluid rounded shadow" />
            <h5 className="mt-3 fw-bold">Branded Bags</h5>
            <p className="text-muted">Personalized mugs for events, gifts, or business promotion.</p>
          </div>

          {/* Project 6 */}
          <div className="col-md-3 mb-4">
            <img src="/images/project6.jpg" alt="Stickers" className="img-fluid rounded shadow" />
            <h5 className="mt-3 fw-bold">Custom Stickers</h5>
            <p className="text-muted">Vinyl and paper stickers for branding and packaging.</p>
          </div>

          {/* Project 7 */}
          <div className="col-md-3 mb-4">
            <img src="/images/IMG-20250724-WA0006.jpg" alt="Packaging" className="img-fluid rounded shadow" />
            <h5 className="mt-3 fw-bold">Branded Packaging</h5>
            <p className="text-muted">Printed bags and boxes for retail and product packaging.</p>
          </div>

          {/* Project 8 */}
          <div className="col-md-3 mb-4">
            <img src="/images/IMG-20250724-WA0022.jpg" alt="Company Profiles"
             className="img-fluid rounded shadow" />
            <h5 className="mt-3 fw-bold">Company Profiles</h5>
            <p className="text-muted">Well-designed company brochures and profile books.</p>
          </div>

        </div>
      </section>
    </>
  );
};

export default PortfolioPage;
