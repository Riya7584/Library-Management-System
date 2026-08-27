import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

import Landing from "./pages/Landing.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import BookCatalog from "./pages/BookCatalog.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Search from "./pages/Search.jsx";
import MyBooks from "./pages/MyBooks.jsx";
import Favorites from "./pages/Favorites.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AddEditBook from "./pages/AddEditBook.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<BookCatalog />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/search" element={<Search />} />

        <Route
          path="/my-books"
          element={
            <ProtectedRoute>
              <MyBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/books/new"
          element={
            <AdminRoute>
              <AddEditBook />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/books/:id/edit"
          element={
            <AdminRoute>
              <AddEditBook />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;