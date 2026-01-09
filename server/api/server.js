import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../config/database.js";
import logger from "../utils/logger.js";
import { errorHandler, notFound } from "../middleware/errorMiddleware.js";
import authRoutes from "../routes/authRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import taskRoutes from "../routes/taskRoutes.js";

dotenv.config();

connectDB();

const app = express();

const corsOptions = {
	origin: function (origin, callback) {
		const allowedOrigins = [
			"https://task-drab-seven.vercel.app/",
			"https://www.task-drab-seven.vercel.app/",
		];

		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
	maxAge: 86400,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	logger.info(`${req.method} ${req.path}`, {
		ip: req.ip,
		userAgent: req.get("user-agent"),
	});
	next();
});

app.get("/", (req, res) => {
	res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
// 	logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });

export default app;
