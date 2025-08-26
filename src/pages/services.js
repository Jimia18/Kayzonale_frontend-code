import React, { useEffect, useState } from "react";
import axios from "axios";

const hardcodedServices = [
  {
    title: "Print Solutions",
    description:
      "From sleek business cards and eye-catching brochures to detailed calendars and striking banners, our print solutions are crafted to make your brand unforgettable. We use premium materials and advanced printing techniques to deliver results that impress and last.",
    src: "/images/5791e781d77eff92e4b6f249690eb717.jpg",
    alt: "Print Solutions",
  },
  {
    title: "Stationery Design Services",
    description:
      "We go beyond photocopying and scanning—our stationery design services give your everyday business documents a polished, professional look. Whether you need ID copies, forms, or customized letterheads, we ensure crisp, high-quality results in both color and black & white.",
    src: "/images/woman-talking-phone-work-printer.jpg",
    alt: "Stationery Design Services",
  },
  {
    title: "Large Format Printing",
    description:
      "Take your message to the next level with our bold and vibrant large-format printing. From banners and posters to event backdrops and signage, our high-resolution prints guarantee visibility and impact, whether indoors or outdoors.",
    src: "/images/IMG-20250724-WA0023.jpg",
    alt: "Large Format Printing",
  },
  {
    title: "Plotting",
    description:
      "Our precision plotting services are tailored for architects, engineers, and technical professionals. We deliver accurate, detailed prints for architectural plans, engineering drawings, and project documents—ready for presentations, approvals, or site use.",
    src: "/images/Cad-plotting-and-plan-printing-3.avif",
    alt: "Plotting",
  },
  {
    title: "Brand Identity Design",
    description:
      "Your brand is more than a logo—it’s your story. Our creative team specializes in building strong brand identities with unique logos, typography, and color palettes. We design impactful marketing materials that make your business instantly recognizable and memorable.",
    src: "/images/brand-machines.jpeg",
    alt: "Brand Identity Design",
  },
  {
    title: "Embroidery",
    description:
      "Add a touch of elegance and professionalism to your uniforms, merchandise, or promotional items with our embroidery services. We offer durable, high-quality stitching that reflects your brand’s personality and stands the test of time.",
    src: "/images/portrait-businesswoman-owner.jpg",
    alt: "Embroidery",
  },
];



const ServicesPage = () => {
  const [dynamicServices, setDynamicServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/services/public");
        const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

        setDynamicServices(
          res.data.map((s) => ({
            title: s.title,
            description: s.description,
            src: s.src
              ? `${API_BASE_URL}/${s.src.replace(/^\/+/, "")}` // ensure clean path
              : `${API_BASE_URL}/static/uploads/services/default-service.jpg`,
            alt: s.title,
          }))
        );

      } catch (err) {
        console.error("Failed to load dynamic services", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const allServices = [...hardcodedServices, ...dynamicServices];

  return (
    <>
      {/* Hero Section */}
      <section
        className="py-5 text-center text-white"
        style={{ background: "linear-gradient(135deg, #e3eef3ff 0%, #d6e8ebff 100%)" }}
      >
        <h1 className="fw-bold mb-2">Our Services</h1>
        <p className="fs-5">
          <a href="/" className="text-white text-decoration-none opacity-75">
            Home
          </a>{" "}
          — <span className="fw-semibold">Our Services</span>
        </p>
      </section>

      {/* Services Section */}
      <div
        className="container-fluid py-5 px-md-5 rounded"
        style={{ background: "linear-gradient(135deg, #f4d9f6 0%, #d0f3f8 100%)" }}
      >
        {loading && dynamicServices.length === 0 && <p className="text-center">Loading services...</p>}
        {allServices.map(({ title, description, src, alt }, index) => (
          <div
            className={`row align-items-center mb-5 g-5 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
            key={title + index}
          >
            {/* Image */}
            <div className="col-md-5 text-center">
              <div className="p-4 h-100 d-flex justify-content-center align-items-center hover-scale">
                <img
                  src={src}
                  alt={alt}
                  className="img-fluid"
                  style={{ maxHeight: "250px", objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Text + Button */}
            <div className="col-md-7">
              <h4 className="fw-bold mb-3 text-primary">{title}</h4>
              <p className="text-muted">{description}</p>
              <a href="/getQuote" className="btn btn-primary mt-3 shadow-sm">
                Get Service
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Final Call to Action */}
      <div className="text-center mt-5">
        <a href="/contact" className="btn btn-lg btn-primary px-5 shadow">
          Contact Us for a Quote
        </a>
      </div>

      {/* Extra Styling */}
      <style jsx>{`
        .hover-scale {
          transition: transform 0.3s ease-in-out;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
};

export default ServicesPage;
