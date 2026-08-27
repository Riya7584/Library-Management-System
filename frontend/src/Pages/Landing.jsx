import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="container" style={{ textAlign: "center", paddingTop: "60px" }}>
      <h1>📚 Welcome to Book Library</h1>
      <p style={{ maxWidth: "500px", margin: "16px auto", color: "#555" }}>
        Browse books, search by title or author, view details, borrow &amp; return,
        and keep track of your favorites — all in one place.
      </p>
      <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "center" }}>
        <Link to="/catalog" className="btn">Browse Catalog</Link>
        <Link to="/register" className="btn btn-outline">Get Started</Link>
      </div>
    </div>
  );
};

export default Landing;