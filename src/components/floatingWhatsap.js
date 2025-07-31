import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import '../styles/floatingWhatsapp.css';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/256777274239" 
      className="floating-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp size={30} color="white" />
    </a>
  );
};

export default FloatingWhatsApp;
