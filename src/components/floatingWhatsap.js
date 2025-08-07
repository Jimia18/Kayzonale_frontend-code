import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import '../styles/floatingWhatsapp.css';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/256777274239" 
      className="floating-whatsapp position-fixed bottom-0 end-0 m-4 d-flex align-items-center btn btn-light shadow"
      style={{ zIndex: 1000, borderRadius: '50px' }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp size={30} color="white" />
      
    </a>
  );
};

export default FloatingWhatsApp;
