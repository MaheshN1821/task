import Task from "../models/Task.js";
import logger from "../utils/logger.js";

export const getTasks = async (req, res) => {
	try {
		const {
			status,
			priority,
			search,
			sortBy = "createdAt",
			order = "desc",
		} = req.query;

		const query = { user: req.user._id };

		if (status) {
			query.status = status;
		}

		if (priority) {
			query.priority = priority;
		}

		if (search) {
			query.$or = [
				{ title: { $regex: search, $options: "i" } },
				{ description: { $regex: search, $options: "i" } },
			];
		}

		const sortOrder = order === "asc" ? 1 : -1;
		const sortOptions = { [sortBy]: sortOrder };

		const tasks = await Task.find(query).sort(sortOptions);

		res.json(tasks);
	} catch (error) {
		logger.error(`Get tasks error: ${error.message}`);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getTaskById = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (task && task.user.toString() === req.user._id.toString()) {
			res.json(task);
		} else {
			res.status(404).json({ message: "Task not found" });
		}
	} catch (error) {
		logger.error(`Get task error: ${error.message}`);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createTask = async (req, res) => {
	try {
		const { title, description, status, priority, dueDate, tags } = req.body;

		const task = await Task.create({
			user: req.user._id,
			title,
			description,
			status,
			priority,
			dueDate,
			tags,
		});

		logger.info(`Task created: ${task._id} by user: ${req.user.email}`);
		res.status(201).json(task);
	} catch (error) {
		logger.error(`Create task error: ${error.message}`);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		if (task.user.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ message: "Not authorized to update this task" });
		}

		const { title, description, status, priority, dueDate, tags } = req.body;

		task.title = title || task.title;
		task.description =
			description !== undefined ? description : task.description;
		task.status = status || task.status;
		task.priority = priority || task.priority;
		task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
		task.tags = tags !== undefined ? tags : task.tags;

		const updatedTask = await task.save();

		logger.info(`Task updated: ${task._id} by user: ${req.user.email}`);
		res.json(updatedTask);
	} catch (error) {
		logger.error(`Update task error: ${error.message}`);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}

		if (task.user.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ message: "Not authorized to delete this task" });
		}

		await task.deleteOne();

		logger.info(`Task deleted: ${req.params.id} by user: ${req.user.email}`);
		res.json({ message: "Task deleted successfully" });
	} catch (error) {
		logger.error(`Delete task error: ${error.message}`);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getTaskStats = async (req, res) => {
	try {
		const stats = await Task.aggregate([
			{ $match: { user: req.user._id } },
			{
				$group: {
					_id: "$status",
					count: { $sum: 1 },
				},
			},
		]);

		const priorityStats = await Task.aggregate([
			{ $match: { user: req.user._id } },
			{
				$group: {
					_id: "$priority",
					count: { $sum: 1 },
				},
			},
		]);

		res.json({
			statusStats: stats,
			priorityStats: priorityStats,
			total: await Task.countDocuments({ user: req.user._id }),
		});
	} catch (error) {
		logger.error(`Get task stats error: ${error.message}`);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
