import express from "express";
import { borrowBook, returnBook } from "../controllers/borrowController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, borrowBook);
router.put("/:id/return", protect, returnBook);

export default router;