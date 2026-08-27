import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api.js";

const AddEditBook = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    coverImage: "",
    isbn: "",
    totalCopies: 1,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      api.get(`/books/${id}`).then(({ data }) => {
        setForm({
          title: data.title || "",
          author: data.author || "",
          genre: data.genre || "",
          description: data.description || "",
          coverImage: data.coverImage || "",
          isbn: data.isbn || "",
          totalCopies: data.totalCopies || 1,
        });
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isEdit) {
        await api.put(`/books/${id}`, form);
      } else {
        await api.post("/books", form);
      }
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save book");
    }
  };

  return (
    <div className="form-box" style={{ maxWidth: "500px" }}>
      <h2>{isEdit ? "Edit Book" : "Add New Book"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submitHandler}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
        <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
        <textarea name="description" placeholder="Description" rows="4" value={form.description} onChange={handleChange} />
        <input name="coverImage" placeholder="Cover Image URL" value={form.coverImage} onChange={handleChange} />
        <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
        <input
          name="totalCopies"
          type="number"
          min="0"
          placeholder="Total Copies"
          value={form.totalCopies}
          onChange={handleChange}
        />
        <button type="submit" className="btn" style={{ width: "100%" }}>
          {isEdit ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddEditBook;