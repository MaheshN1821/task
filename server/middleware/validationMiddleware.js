import { body, validationResult } from "express-validator";

export const validateRegistration = [
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name is required")
		.isLength({ max: 50 })
		.withMessage("Name cannot be more than 50 characters"),
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Please provide a valid email")
		.normalizeEmail(),
	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),
];

export const validateLogin = [
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Please provide a valid email")
		.normalizeEmail(),
	body("password").notEmpty().withMessage("Password is required"),
];

export const validateTask = [
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Title is required")
		.isLength({ max: 100 })
		.withMessage("Title cannot be more than 100 characters"),
	body("description")
		.optional()
		.trim()
		.isLength({ max: 1000 })
		.withMessage("Description cannot be more than 1000 characters"),
	body("status")
		.optional()
		.isIn(["pending", "in-progress", "completed"])
		.withMessage("Status must be pending, in-progress, or completed"),
	body("priority")
		.optional()
		.isIn(["low", "medium", "high"])
		.withMessage("Priority must be low, medium, or high"),
];

export const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};
