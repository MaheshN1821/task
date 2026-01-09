import express from "express";
import {
	getTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
	getTaskStats,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
	validateTask,
	handleValidationErrors,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", protect, getTasks);
router.get("/stats", protect, getTaskStats);
router.get("/:id", protect, getTaskById);
router.post("/", protect, validateTask, handleValidationErrors, createTask);
router.put("/:id", protect, validateTask, handleValidationErrors, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
