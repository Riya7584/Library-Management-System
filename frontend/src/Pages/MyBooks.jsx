import React, { useEffect, useState } from "react";
import api from "../services/api.js";

const MyBooks = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [message, setMessage] = useState("");

  const fetchMyBooks = async () => {
    const { data } = await api.get("/my-books");
    setBorrowings(data);
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const handleReturn = async (borrowId) => {
    try {
      await api.put(`/borrow/${borrowId}/return`);
      setMessage("Book returned successfully!");
      fetchMyBooks();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to return book");
    }
  };

  return (
    <div className="container">
      <h2>My Books</h2>
      {message && <p style={{ color: "#24463b" }}>{message}</p>}

      {borrowings.length === 0 ? (
        <p>You haven't borrowed any books yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {borrowings.map((b) => (
              <tr key={b._id}>
                <td>{b.book?.title}</td>
                <td>{new Date(b.borrowDate).toLocaleDateString()}</td>
                <td>{new Date(b.dueDate).toLocaleDateString()}</td>
                <td>{b.status}</td>
                <td>
                  {b.status === "borrowed" && (
                    <button className="btn" onClick={() => handleReturn(b._id)}>Return</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBooks;