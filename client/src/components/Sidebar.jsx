import { Link, useLocation } from "react-router-dom";
import {
	LayoutDashboard,
	CheckSquare,
	User,
	Settings,
	LogOut,
	Menu,
	X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Sidebar = () => {
	const location = useLocation();
	const { logout, user } = useAuth();
	const [isOpen, setIsOpen] = useState(false);

	const navItems = [
		{ name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
		{ name: "Tasks", icon: CheckSquare, path: "/tasks" },
		{ name: "Profile", icon: User, path: "/profile" },
		{ name: "Settings", icon: Settings, path: "/settings" },
	];

	const isActive = (path) => location.pathname === path;

	return (
		<>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700"
			>
				{isOpen ? (
					<X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
				) : (
					<Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
				)}
			</button>

			{isOpen && (
				<div
					onClick={() => setIsOpen(false)}
					className="lg:hidden fixed inset-0 bg-black/50 z-30"
				/>
			)}

			<aside
				className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				}`}
			>
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center space-x-3">
						<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center shadow-lg">
							<CheckSquare className="w-6 h-6 text-white" />
						</div>
						<div>
							<h1 className="text-xl font-bold text-gray-900 dark:text-white">
								TaskFlow
							</h1>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Manage with ease
							</p>
						</div>
					</div>
				</div>

				<nav className="flex-1 p-4 overflow-y-auto">
					<ul className="space-y-2">
						{navItems.map((item) => (
							<li key={item.path}>
								<Link
									to={item.path}
									onClick={() => setIsOpen(false)}
									className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
										isActive(item.path)
											? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm"
											: "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
									}`}
								>
									<item.icon className="w-5 h-5" />
									<span className="font-medium">{item.name}</span>
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className="p-4 border-t border-gray-200 dark:border-gray-700">
					<div className="flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
						<div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white font-semibold shadow-md">
							{user?.name?.charAt(0).toUpperCase()}
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
								{user?.name}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400 truncate">
								{user?.email}
							</p>
						</div>
					</div>

					<button
						onClick={logout}
						className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
					>
						<LogOut className="w-5 h-5" />
						<span className="font-medium">Logout</span>
					</button>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
