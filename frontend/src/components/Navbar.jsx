import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 24px",
      background: "#24463b",
      color: "#fff",
    }}>
      <Link to="/" style={{ fontWeight: "bold", fontSize: "18px", color: "#fff" }}>
        📚 Book Library
      </Link>

      <div style={{ display: "flex", gap: "16px", alignItems: "center", fontSize: "14px" }}>
        <Link to="/catalog" style={{ color: "#fff" }}>Catalog</Link>
        <Link to="/search" style={{ color: "#fff" }}>Search</Link>

        {user && (
          <>
            <Link to="/my-books" style={{ color: "#fff" }}>My Books</Link>
            <Link to="/favorites" style={{ color: "#fff" }}>Favorites</Link>
          </>
        )}

        {user?.role === "admin" && (
          <Link to="/admin" style={{ color: "#fff" }}>Admin</Link>
        )}

        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff" }}>Login</Link>
            <Link to="/register" style={{ color: "#fff" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;