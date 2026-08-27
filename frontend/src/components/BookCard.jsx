import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="card">
      <div style={{
        height: "140px",
        background: "#e4d6b6",
        borderRadius: "4px",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontSize: "13px", color: "#7a6b4f" }}>No Cover</span>
        )}
      </div>
      <h4 style={{ margin: "0 0 4px" }}>{book.title}</h4>
      <p style={{ margin: "0 0 8px", fontSize: "13px", color: "#555" }}>{book.author}</p>
      <p style={{ margin: "0 0 10px", fontSize: "12px", color: book.availableCopies > 0 ? "#24463b" : "#a6402e" }}>
        {book.availableCopies > 0 ? `${book.availableCopies} available` : "Not available"}
      </p>
      <Link to={`/books/${book._id}`} className="btn" style={{ width: "100%", textAlign: "center" }}>
        View Details
      </Link>
    </div>
  );
};

export default BookCard;