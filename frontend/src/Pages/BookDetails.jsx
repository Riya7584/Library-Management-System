import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import { AuthContext } from "../context/AuthContext.jsx";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await api.get(`/books/${id}`);
      setBook(data);
    };
    fetchBook();
  }, [id]);

  const handleBorrow = async () => {
    try {
      await api.post("/borrow", { bookId: id });
      setMessage("Book borrowed successfully!");
      const { data } = await api.get(`/books/${id}`);
      setBook(data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to borrow book");
    }
  };

  const handleFavorite = async () => {
    try {
      await api.post("/favorites", { bookId: id });
      setMessage("Added to favorites!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add favorite");
    }
  };

  if (!book) return <div className="container">Loading...</div>;

  return (
    <div className="container" style={{ maxWidth: "700px" }}>
      <div className="card">
        <h2>{book.title}</h2>
        <p style={{ color: "#555" }}>by {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Available Copies:</strong> {book.availableCopies} / {book.totalCopies}</p>
        <p>{book.description}</p>

        {message && <p className="error" style={{ color: "#24463b" }}>{message}</p>}

        {user && (
          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <button className="btn" onClick={handleBorrow} disabled={book.availableCopies < 1}>
              {book.availableCopies < 1 ? "Not Available" : "Borrow"}
            </button>
            <button className="btn btn-outline" onClick={handleFavorite}>
              Add to Favorites
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;