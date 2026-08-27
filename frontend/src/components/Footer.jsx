import React from "react";

const Footer = () => {
  return (
    <footer style={{
      textAlign: "center",
      padding: "20px",
      color: "#6b7280",
      fontSize: "13px",
    }}>
      © {new Date().getFullYear()} Book Library — Built with MERN
    </footer>
  );
};

export default Footer;