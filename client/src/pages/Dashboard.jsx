import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { taskAPI } from "../services/api";
import {
	CheckCircle2,
	Clock,
	AlertCircle,
	TrendingUp,
	ArrowRight,
} from "lucide-react";

const Dashboard = () => {
	const [stats, setStats] = useState(null);
	const [recentTasks, setRecentTasks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [statsRes, tasksRes] = await Promise.all([
					taskAPI.getStats(),
					taskAPI.getTasks({ sortBy: "updatedAt", order: "desc" }),
				]);
				setStats(statsRes.data);
				setRecentTasks(tasksRes.data.slice(0, 5));
			} catch (error) {
				console.error("Failed to fetch dashboard data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const getStatusCount = (status) => {
		const stat = stats?.statusStats?.find((s) => s._id === status);
		return stat?.count || 0;
	};

	const statCards = [
		{
			title: "Total Tasks",
			value: stats?.total || 0,
			icon: TrendingUp,
			color: "from-blue-500 to-blue-600",
			bgColor: "bg-blue-50 dark:bg-blue-900/20",
			textColor: "text-blue-600 dark:text-blue-400",
		},
		{
			title: "In Progress",
			value: getStatusCount("in-progress"),
			icon: Clock,
			color: "from-yellow-500 to-yellow-600",
			bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
			textColor: "text-yellow-600 dark:text-yellow-400",
		},
		{
			title: "Completed",
			value: getStatusCount("completed"),
			icon: CheckCircle2,
			color: "from-green-500 to-green-600",
			bgColor: "bg-green-50 dark:bg-green-900/20",
			textColor: "text-green-600 dark:text-green-400",
		},
		{
			title: "Pending",
			value: getStatusCount("pending"),
			icon: AlertCircle,
			color: "from-red-500 to-red-600",
			bgColor: "bg-red-50 dark:bg-red-900/20",
			textColor: "text-red-600 dark:text-red-400",
		},
	];

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
					title="Dashboard"
					subtitle="Welcome back! Here's an overview of your tasks"
				/>

				<main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
					{loading ? (
						<div className="flex items-center justify-center h-64">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
						</div>
					) : (
						<>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
								{statCards.map((card) => (
									<div
										key={card.title}
										className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
									>
										<div className="flex items-center justify-between mb-4">
											<div
												className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center`}
											>
												<card.icon className={`w-6 h-6 ${card.textColor}`} />
											</div>
											<div className={`text-3xl font-bold ${card.textColor}`}>
												{card.value}
											</div>
										</div>
										<h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
											{card.title}
										</h3>
									</div>
								))}
							</div>

							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
								<div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
									<div>
										<h2 className="text-xl font-bold text-gray-900 dark:text-white">
											Recent Tasks
										</h2>
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
											Your latest task updates
										</p>
									</div>
									<Link
										to="/tasks"
										className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
									>
										<span>View All</span>
										<ArrowRight className="w-4 h-4" />
									</Link>
								</div>

								<div className="divide-y divide-gray-200 dark:divide-gray-700">
									{recentTasks.length === 0 ? (
										<div className="p-8 text-center">
											<p className="text-gray-500 dark:text-gray-400">
												No tasks yet. Create your first task!
											</p>
										</div>
									) : (
										recentTasks.map((task) => (
											<div
												key={task._id}
												className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
											>
												<div className="flex items-start justify-between">
													<div className="flex-1 min-w-0">
														<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
															{task.title}
														</h3>
														{task.description && (
															<p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
																{task.description}
															</p>
														)}
														<div className="flex flex-wrap gap-2">
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
													</div>
												</div>
											</div>
										))
									)}
								</div>
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
