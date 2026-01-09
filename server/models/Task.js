import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		title: {
			type: String,
			required: [true, "Please provide a title"],
			trim: true,
			maxlength: [100, "Title cannot be more than 100 characters"],
		},
		description: {
			type: String,
			default: "",
			maxlength: [1000, "Description cannot be more than 1000 characters"],
		},
		status: {
			type: String,
			enum: ["pending", "in-progress", "completed"],
			default: "pending",
		},
		priority: {
			type: String,
			enum: ["low", "medium", "high"],
			default: "medium",
		},
		dueDate: {
			type: Date,
			default: null,
		},
		tags: [
			{
				type: String,
				trim: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ user: 1, priority: 1 });
taskSchema.index({ title: "text", description: "text" });

const Task = mongoose.model("Task", taskSchema);

export default Task;
