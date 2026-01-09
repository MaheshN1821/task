import { Moon, Sun, Bell } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Header = ({ title, subtitle }) => {
	const { theme, toggleTheme } = useTheme();

	return (
		<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
			<div className="px-4 sm:px-6 lg:px-8 py-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
							{title}
						</h1>
						{subtitle && (
							<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
								{subtitle}
							</p>
						)}
					</div>

					<div className="flex items-center space-x-3">
						<button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
							<Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
							<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
						</button>

						<button
							onClick={toggleTheme}
							className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
							aria-label="Toggle theme"
						>
							{theme === "dark" ? (
								<Sun className="w-5 h-5 text-yellow-500" />
							) : (
								<Moon className="w-5 h-5 text-gray-700" />
							)}
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
