import Book from "../models/Book.js";

// @desc    Get all books (supports ?keyword= search & ?genre= filter)
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res) => {
  try {
    const { keyword, genre } = req.query;

    let query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { author: { $regex: keyword, $options: "i" } },
      ];
    }

    if (genre) {
      query.genre = { $regex: genre, $options: "i" };
    }

    const books = await Book.find(query).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single book by id
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new book
// @route   POST /api/books
// @access  Private/Admin
export const createBook = async (req, res) => {
  try {
    const { title, author, genre, description, coverImage, isbn, totalCopies } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and author are required" });
    }

    const book = await Book.create({
      title,
      author,
      genre,
      description,
      coverImage,
      isbn,
      totalCopies: totalCopies || 1,
      availableCopies: totalCopies || 1,
      addedBy: req.user._id,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const { title, author, genre, description, coverImage, isbn, totalCopies, availableCopies } = req.body;

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.genre = genre ?? book.genre;
    book.description = description ?? book.description;
    book.coverImage = coverImage ?? book.coverImage;
    book.isbn = isbn ?? book.isbn;
    book.totalCopies = totalCopies ?? book.totalCopies;
    book.availableCopies = availableCopies ?? book.availableCopies;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.deleteOne();
    res.json({ message: "Book removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};