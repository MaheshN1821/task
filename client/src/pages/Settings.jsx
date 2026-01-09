import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { userAPI } from "../services/api";
import { Moon, Sun, Trash2, AlertTriangle } from "lucide-react";

const Settings = () => {
	const { user, logout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const handleDeleteAccount = async () => {
		setDeleteLoading(true);
		try {
			await userAPI.deleteAccount();
			logout();
			navigate("/login");
		} catch (error) {
			console.error("Failed to delete account:", error);
			alert("Failed to delete account. Please try again.");
		} finally {
			setDeleteLoading(false);
		}
	};

	return (
		<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
			<Sidebar />

			<div className="flex-1 flex flex-col overflow-hidden">
				<Header
					title="Settings"
					subtitle="Manage your preferences and account"
				/>

				<main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
					<div className="max-w-3xl mx-auto space-y-6">
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
							<div className="p-6 border-b border-gray-200 dark:border-gray-700">
								<h2 className="text-xl font-bold text-gray-900 dark:text-white">
									Appearance
								</h2>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
									Customize how the app looks to you
								</p>
							</div>

							<div className="p-6">
								<div className="flex items-center justify-between">
									<div className="flex-1">
										<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
											Theme
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Choose between light and dark mode
										</p>
									</div>

									<button
										onClick={toggleTheme}
										className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
									>
										{theme === "dark" ? (
											<>
												<Sun className="w-5 h-5 text-yellow-500" />
												<span className="text-gray-900 dark:text-white font-medium">
													Light
												</span>
											</>
										) : (
											<>
												<Moon className="w-5 h-5 text-gray-700" />
												<span className="text-gray-900 dark:text-white font-medium">
													Dark
												</span>
											</>
										)}
									</button>
								</div>
							</div>
						</div>

						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
							<div className="p-6 border-b border-gray-200 dark:border-gray-700">
								<h2 className="text-xl font-bold text-gray-900 dark:text-white">
									Account Information
								</h2>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
									Your account details
								</p>
							</div>

							<div className="p-6 space-y-4">
								<div>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Name
									</p>
									<p className="text-lg font-medium text-gray-900 dark:text-white">
										{user?.name}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Email
									</p>
									<p className="text-lg font-medium text-gray-900 dark:text-white">
										{user?.email}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Role
									</p>
									<p className="text-lg font-medium text-gray-900 dark:text-white capitalize">
										{user?.role}
									</p>
								</div>
							</div>
						</div>

						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-red-200 dark:border-red-800 overflow-hidden">
							<div className="p-6 border-b border-red-200 dark:border-red-800">
								<h2 className="text-xl font-bold text-red-600 dark:text-red-400">
									Danger Zone
								</h2>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
									Irreversible actions
								</p>
							</div>

							<div className="p-6">
								{!showDeleteConfirm ? (
									<div className="flex items-center justify-between">
										<div className="flex-1">
											<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
												Delete Account
											</h3>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Permanently delete your account and all data
											</p>
										</div>

										<button
											onClick={() => setShowDeleteConfirm(true)}
											className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
										>
											<Trash2 className="w-5 h-5" />
											<span>Delete</span>
										</button>
									</div>
								) : (
									<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
										<div className="flex items-start space-x-3 mb-4">
											<AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
											<div>
												<h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
													Are you absolutely sure?
												</h3>
												<p className="text-sm text-red-700 dark:text-red-300 mb-4">
													This action cannot be undone. This will permanently
													delete your account and remove all your data from our
													servers.
												</p>
											</div>
										</div>

										<div className="flex gap-3">
											<button
												onClick={() => setShowDeleteConfirm(false)}
												className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 font-medium"
											>
												Cancel
											</button>
											<button
												onClick={handleDeleteAccount}
												disabled={deleteLoading}
												className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{deleteLoading
													? "Deleting..."
													: "Yes, Delete My Account"}
											</button>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Settings;
