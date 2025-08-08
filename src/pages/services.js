import React from 'react';
import HeroSliderService from '../components/HeroSliderService';
import '../styles/services.css';
const services = [
  {
    title: "Print Solutions",
    description: "Business cards, brochures, flyers, calendars and banners for all your marketing needs.",
    imgSrc: "/images/printerIcon.png",
    alt: "Print Solutions",
  },
  {
    title: "Stationery Design Services",
    description: "Photocopying and Scanning services for documents, IDs, and forms. Clear, high-quality results in both black & white and color.",
    imgSrc: "/images/photocopier.png",
    alt: "Stationery Design Services",
  },
  {
    title: "Large Format Printing",
    description: "For banners, posters, backdrops, signage, and more. Bold, high-resolution prints made to stand out indoors or outdoors.",
    imgSrc: "/images/LargeFomatPrinter.png",
    alt: "Large Format Printing",
  },
  {
    title: "Plotting",
    description: "Architectural plans, engineering drawings, and technical documents. Clear, accurate plots ready for presentation or submission.",
    imgSrc: "/images/plotting.png",
    alt: "Plotting",
  },
  {
    title: "Brand Identity Design",
    description: "Expert design services for logos, color schemes, typography, and marketing materials that communicate your unique story.",
    imgSrc: "/images/branding.jpeg",
    alt: "Brand Identity Design",
  },
  {
    title: "Embroidery",
    description: "Embroidery design solutions for uniforms and merchandise. High-quality stitching to represent your brand.",
    imgSrc: "/images/embroidery.png",
    alt: "Embroidery",
  },
];

const ServicesPage = () => {
   
  
  return (
    <>
      {/* Hero Section */}
      <section>
        <HeroSliderService />
      </section>

      <div className="container my-5">
        {/* Optional Intro Text */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Services</h2>
          <p className="text-muted fs-5">
            Explore our wide range of quality printing and branding solutions tailored for your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4 justify-content-center">
          {services.map(({ title, description, imgSrc, alt }) => (
            <div className="col-md-4 col-sm-6" key={title}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={imgSrc}
                  alt={alt}
                  className="card-img-top mx-auto mt-4"
                  style={{ height: '70px', width: 'auto', objectFit: 'contain' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{title}</h5>
                  <p className="card-text text-muted">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <a href="/contact" className="btn btn-primary btn-lg px-5">
            Contact Us for a Quote
          </a>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
