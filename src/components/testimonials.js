import React, { useState } from "react";

const testimonials = [
  {
    name: "Kisitu W.",
    role: "Client",
    image: "/images/Male icon.jpg",
    rating: 5,
    feedback: "Reasonable prices though not the cheapest, but good quality and reliable services.",
  },
  {
    name: "Racheal N.",
    role: "Intern",
    image: "/images/womanicon.jpg",
    rating: 5,
    feedback: "As an intern, I needed to find a team that allowed me to grow. This team went above and beyond.",
  },
  {
    name: "Tindi R.",
    role: "Partner",
    image: "/images/womanicon.jpg",
    rating: 5,
    feedback: "Very good partner in printing as a service. Always delivers on time.",
  },
  {
    name: "Allan K.",
    role: "Client",
    image: "/images/Male icon.jpg",
    rating: 4,
    feedback: "Great customer service and prompt delivery. Will definitely return.",
  },
  {
    name: "Joan B.",
    role: "Client",
    image: "/images/womanicon.jpg",
    rating: 5,
    feedback: "Professional, affordable, and always a pleasant experience.",
  },
];

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const currentTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="testimonials-page py-5 text-center position-relative">
      <h3 className="subheading text-muted">HAPPY CUSTOMERS</h3>
      <h1 className="main-heading mb-4">
        What People <span className="text-primary">Are Saying</span>
      </h1>

      <div className="container-fluid position-relative">
        {/* Left arrow */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="btn btn-light border position-absolute top-50 start-0 translate-middle-y"
          style={{ zIndex: 1 }}
        >
          &#8592;
        </button>

        <div className="row justify-content-center">
          {currentTestimonials.map((t, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="card h-100 shadow-sm p-3 text-center interactive-card">
                <img
                  src={t.image}
                  alt={t.name}
                  className="rounded-circle mb-3"
                  style={{ width: 80, height: 80, objectFit: "cover", margin: "0 auto" }}
                />
                <h5>
                  {t.name} <small className="text-muted">/ {t.role}</small>
                </h5>
                <div className="stars mb-2">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-warning">⭐</span>
                  ))}
                </div>
                <p className="text-muted fst-italic">"{t.feedback}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="btn btn-light border position-absolute top-50 end-0 translate-middle-y"
          style={{ zIndex: 1 }}
        >
          &#8594;
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="d-flex justify-content-center mt-4 gap-2 ">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`dot btn btn-sm rounded-circle ${index === currentPage ? "bg-primary" : "bg-light"}`}
            style={{
              width: 12,
              height: 12,
              padding: 0,
              border: "1px solid #ccc",
            }}
            onClick={() => goToPage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
