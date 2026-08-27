import React, { useState } from "react";
import api from "../services/api.js";
import BookCard from "../components/BookCard.jsx";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data } = await api.get(`/books?keyword=${encodeURIComponent(keyword)}`);
    setResults(data);
    setSearched(true);
  };

  return (
    <div className="container">
      <h2>Search Books</h2>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", maxWidth: "500px" }}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ marginBottom: 0 }}
        />
        <button type="submit" className="btn">Search</button>
      </form>

      {searched && (
        results.length === 0 ? (
          <p style={{ marginTop: "20px" }}>No books matched your search.</p>
        ) : (
          <div className="grid" style={{ marginTop: "20px" }}>
            {results.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Search;