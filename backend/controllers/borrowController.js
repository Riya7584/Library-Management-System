import Borrowing from "../models/Borrowing.js";
import Book from "../models/Book.js";

const DEFAULT_BORROW_DAYS = 14;

// @desc    Borrow a book
// @route   POST /api/borrow
// @access  Private
export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({ message: "bookId is required" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.availableCopies < 1) {
      return res.status(400).json({ message: "No copies available right now" });
    }

    const alreadyBorrowed = await Borrowing.findOne({
      user: req.user._id,
      book: bookId,
      status: "borrowed",
    });

    if (alreadyBorrowed) {
      return res.status(400).json({ message: "You already have this book borrowed" });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + DEFAULT_BORROW_DAYS);

    const borrowing = await Borrowing.create({
      user: req.user._id,
      book: bookId,
      dueDate,
    });

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Return a borrowed book
// @route   PUT /api/borrow/:id/return
// @access  Private
export const returnBook = async (req, res) => {
  try {
    const borrowing = await Borrowing.findById(req.params.id);

    if (!borrowing) {
      return res.status(404).json({ message: "Borrowing record not found" });
    }

    if (borrowing.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to return this book" });
    }

    if (borrowing.status === "returned") {
      return res.status(400).json({ message: "Book already returned" });
    }

    borrowing.status = "returned";
    borrowing.returnDate = new Date();
    await borrowing.save();

    const book = await Book.findById(borrowing.book);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    res.json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's borrowed books
// @route   GET /api/my-books
// @access  Private
export const getMyBooks = async (req, res) => {
  try {
    const borrowings = await Borrowing.find({ user: req.user._id })
      .populate("book")
      .sort({ createdAt: -1 });

    res.json(borrowings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};