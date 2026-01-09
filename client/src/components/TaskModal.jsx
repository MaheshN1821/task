import { useState, useEffect } from "react";
import { X, Loader2, Save } from "lucide-react";
import { taskAPI } from "../services/api";

const TaskModal = ({ task, onClose }) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "pending",
		priority: "medium",
		dueDate: "",
		tags: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (task) {
			setFormData({
				title: task.title || "",
				description: task.description || "",
				status: task.status || "pending",
				priority: task.priority || "medium",
				dueDate: task.dueDate
					? new Date(task.dueDate).toISOString().split("T")[0]
					: "",
				tags: task.tags ? task.tags.join(", ") : "",
			});
		}
	}, [task]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const payload = {
				...formData,
				tags: formData.tags
					.split(",")
					.map((tag) => tag.trim())
					.filter((tag) => tag),
				dueDate: formData.dueDate || null,
			};

			if (task) {
				await taskAPI.updateTask(task._id, payload);
			} else {
				await taskAPI.createTask(payload);
			}

			onClose(true);
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
						{task ? "Edit Task" : "Create New Task"}
					</h2>
					<button
						onClick={() => onClose(false)}
						className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
					>
						<X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{error && (
						<div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
							<p className="text-sm text-red-600 dark:text-red-400">{error}</p>
						</div>
					)}

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Title <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							required
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
							placeholder="Enter task title"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Description
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							rows="4"
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all resize-none"
							placeholder="Enter task description"
						/>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Status
							</label>
							<select
								name="status"
								value={formData.status}
								onChange={handleChange}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							>
								<option value="pending">Pending</option>
								<option value="in-progress">In Progress</option>
								<option value="completed">Completed</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Priority
							</label>
							<select
								name="priority"
								value={formData.priority}
								onChange={handleChange}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Due Date
						</label>
						<input
							type="date"
							name="dueDate"
							value={formData.dueDate}
							onChange={handleChange}
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Tags (comma separated)
						</label>
						<input
							type="text"
							name="tags"
							value={formData.tags}
							onChange={handleChange}
							className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
							placeholder="work, urgent, personal"
						/>
					</div>

					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={() => onClose(false)}
							className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 font-medium"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading}
							className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-medium"
						>
							{loading ? (
								<>
									<Loader2 className="w-5 h-5 animate-spin" />
									<span>Saving...</span>
								</>
							) : (
								<>
									<Save className="w-5 h-5" />
									<span>{task ? "Update Task" : "Create Task"}</span>
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default TaskModal;
