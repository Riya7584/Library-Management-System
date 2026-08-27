import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  const fetchBooks = async () => {
    const { data } = await api.get("/books");
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      setMessage("Book deleted");
      fetchBooks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Admin Dashboard</h2>
        <Link to="/admin/books/new" className="btn">+ Add Book</Link>
      </div>

      {message && <p style={{ color: "#24463b" }}>{message}</p>}

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Copies (Available/Total)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.availableCopies} / {book.totalCopies}</td>
              <td style={{ display: "flex", gap: "8px" }}>
                <Link to={`/admin/books/${book._id}/edit`} className="btn btn-outline">Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;