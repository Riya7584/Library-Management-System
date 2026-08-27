import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const { data } = await api.get("/favorites");
    setFavorites(data);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = async (bookId) => {
    await api.delete(`/favorites/${bookId}`);
    fetchFavorites();
  };

  return (
    <div className="container">
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet. Go add some books you love!</p>
      ) : (
        <div className="grid">
          {favorites.map((fav) => (
            <div className="card" key={fav._id}>
              <h4 style={{ margin: "0 0 4px" }}>{fav.book?.title}</h4>
              <p style={{ margin: "0 0 10px", fontSize: "13px", color: "#555" }}>{fav.book?.author}</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <Link to={`/books/${fav.book?._id}`} className="btn" style={{ flex: 1, textAlign: "center" }}>
                  View
                </Link>
                <button className="btn btn-danger" onClick={() => handleRemove(fav.book?._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;