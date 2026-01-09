import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskModal from "../components/TaskModal";
import { taskAPI } from "../services/api";
import {
	Plus,
	Search,
	Filter,
	Edit2,
	Trash2,
	Calendar,
	Loader2,
} from "lucide-react";

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingTask, setEditingTask] = useState(null);
	const [filters, setFilters] = useState({
		search: "",
		status: "",
		priority: "",
		sortBy: "createdAt",
		order: "desc",
	});
	const [showFilters, setShowFilters] = useState(false);

	const fetchTasks = async () => {
		try {
			setLoading(true);
			const params = {};
			if (filters.search) params.search = filters.search;
			if (filters.status) params.status = filters.status;
			if (filters.priority) params.priority = filters.priority;
			params.sortBy = filters.sortBy;
			params.order = filters.order;

			const response = await taskAPI.getTasks(params);
			setTasks(response.data);
		} catch (error) {
			console.error("Failed to fetch tasks:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, [filters]);

	const handleCreateTask = () => {
		setEditingTask(null);
		setIsModalOpen(true);
	};

	const handleEditTask = (task) => {
		setEditingTask(task);
		setIsModalOpen(true);
	};

	const handleDeleteTask = async (taskId) => {
		if (!window.confirm("Are you sure you want to delete this task?")) {
			return;
		}

		try {
			await taskAPI.deleteTask(taskId);
			fetchTasks();
		} catch (error) {
			console.error("Failed to delete task:", error);
		}
	};

	const handleModalClose = (refresh) => {
		setIsModalOpen(false);
		setEditingTask(null);
		if (refresh) {
			fetchTasks();
		}
	};

	const getPriorityColor = (priority) => {
		const colors = {
			low: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
			medium:
				"bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
			high: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
		};
		return colors[priority] || colors.low;
	};

	const getStatusColor = (status) => {
		const colors = {
			pending:
				"bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
			"in-progress":
				"bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
			completed:
				"bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400",
		};
		return colors[status] || colors.pending;
	};

	return (
		<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
			<Sidebar />

			<div className="flex-1 flex flex-col overflow-hidden">
				<Header
					title="Tasks"
					subtitle="Manage and organize your tasks efficiently"
				/>

				<main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
					<div className="mb-6">
						<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
							<div className="flex-1 w-full sm:max-w-md relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
								<input
									type="text"
									value={filters.search}
									onChange={(e) =>
										setFilters({ ...filters, search: e.target.value })
									}
									placeholder="Search tasks..."
									className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
								/>
							</div>

							<div className="flex gap-2 w-full sm:w-auto">
								<button
									onClick={() => setShowFilters(!showFilters)}
									className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 font-medium"
								>
									<Filter className="w-5 h-5" />
									<span>Filters</span>
								</button>

								<button
									onClick={handleCreateTask}
									className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg font-medium"
								>
									<Plus className="w-5 h-5" />
									<span>New Task</span>
								</button>
							</div>
						</div>

						{showFilters && (
							<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Status
										</label>
										<select
											value={filters.status}
											onChange={(e) =>
												setFilters({ ...filters, status: e.target.value })
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
										>
											<option value="">All Status</option>
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
											value={filters.priority}
											onChange={(e) =>
												setFilters({ ...filters, priority: e.target.value })
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
										>
											<option value="">All Priority</option>
											<option value="low">Low</option>
											<option value="medium">Medium</option>
											<option value="high">High</option>
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Sort By
										</label>
										<select
											value={filters.sortBy}
											onChange={(e) =>
												setFilters({ ...filters, sortBy: e.target.value })
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
										>
											<option value="createdAt">Created Date</option>
											<option value="updatedAt">Updated Date</option>
											<option value="dueDate">Due Date</option>
											<option value="title">Title</option>
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Order
										</label>
										<select
											value={filters.order}
											onChange={(e) =>
												setFilters({ ...filters, order: e.target.value })
											}
											className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
										>
											<option value="desc">Descending</option>
											<option value="asc">Ascending</option>
										</select>
									</div>
								</div>
							</div>
						)}
					</div>

					{loading ? (
						<div className="flex items-center justify-center h-64">
							<Loader2 className="w-12 h-12 animate-spin text-blue-600" />
						</div>
					) : tasks.length === 0 ? (
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
							<div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
								<Plus className="w-10 h-10 text-gray-400" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
								No tasks found
							</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-6">
								Get started by creating your first task
							</p>
							<button
								onClick={handleCreateTask}
								className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg font-medium"
							>
								<Plus className="w-5 h-5" />
								<span>Create Task</span>
							</button>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
							{tasks.map((task) => (
								<div
									key={task._id}
									className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all"
								>
									<div className="flex items-start justify-between mb-4">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 line-clamp-2">
											{task.title}
										</h3>
										<div className="flex items-center space-x-2 ml-2">
											<button
												onClick={() => handleEditTask(task)}
												className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-400 transition-colors"
											>
												<Edit2 className="w-4 h-4" />
											</button>
											<button
												onClick={() => handleDeleteTask(task._id)}
												className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 transition-colors"
											>
												<Trash2 className="w-4 h-4" />
											</button>
										</div>
									</div>

									{task.description && (
										<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
											{task.description}
										</p>
									)}

									<div className="flex flex-wrap gap-2 mb-4">
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
												task.status
											)}`}
										>
											{task.status}
										</span>
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
												task.priority
											)}`}
										>
											{task.priority}
										</span>
									</div>

									{task.dueDate && (
										<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
											<Calendar className="w-4 h-4" />
											<span>
												Due: {new Date(task.dueDate).toLocaleDateString()}
											</span>
										</div>
									)}

									{task.tags && task.tags.length > 0 && (
										<div className="flex flex-wrap gap-2 mt-3">
											{task.tags.map((tag, index) => (
												<span
													key={index}
													className="px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
												>
													{tag}
												</span>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</main>
			</div>

			{isModalOpen && (
				<TaskModal task={editingTask} onClose={handleModalClose} />
			)}
		</div>
	);
};

export default Tasks;
