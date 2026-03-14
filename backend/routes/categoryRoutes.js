import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createCategory);

router.get("/", getCategories);

export default router;