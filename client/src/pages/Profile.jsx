import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { userAPI } from "../services/api";
import { User, Mail, Save, Loader2 } from "lucide-react";

const Profile = () => {
	const { user, updateUser } = useAuth();
	const [formData, setFormData] = useState({
		name: user?.name || "",
		email: user?.email || "",
		bio: user?.bio || "",
		avatar: user?.avatar || "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState({ type: "", text: "" });

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage({ type: "", text: "" });

		if (formData.password && formData.password !== formData.confirmPassword) {
			setMessage({ type: "error", text: "Passwords do not match" });
			return;
		}

		setLoading(true);

		try {
			const payload = {
				name: formData.name,
				email: formData.email,
				bio: formData.bio,
				avatar: formData.avatar,
			};

			if (formData.password) {
				payload.password = formData.password;
			}

			const response = await userAPI.updateProfile(payload);
			updateUser(response.data);
			setMessage({ type: "success", text: "Profile updated successfully!" });
			setFormData({ ...formData, password: "", confirmPassword: "" });
		} catch (error) {
			setMessage({
				type: "error",
				text: error.response?.data?.message || "Failed to update profile",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
			<Sidebar />

			<div className="flex-1 flex flex-col overflow-hidden">
				<Header title="Profile" subtitle="Manage your account information" />

				<main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
					<div className="max-w-3xl mx-auto">
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
							<div className="p-8">
								<div className="flex items-center justify-center mb-8">
									<div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
										{user?.name?.charAt(0).toUpperCase()}
									</div>
								</div>

								{message.text && (
									<div
										className={`mb-6 p-4 rounded-lg ${
											message.type === "success"
												? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
												: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
										}`}
									>
										<p
											className={`text-sm ${
												message.type === "success"
													? "text-green-600 dark:text-green-400"
													: "text-red-600 dark:text-red-400"
											}`}
										>
											{message.text}
										</p>
									</div>
								)}

								<form onSubmit={handleSubmit} className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Full Name
										</label>
										<div className="relative">
											<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
											<input
												type="text"
												name="name"
												value={formData.name}
												onChange={handleChange}
												required
												className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
												placeholder="Your full name"
											/>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Email Address
										</label>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
											<input
												type="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												required
												className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
												placeholder="your@email.com"
											/>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Bio
										</label>
										<textarea
											name="bio"
											value={formData.bio}
											onChange={handleChange}
											rows="4"
											className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all resize-none"
											placeholder="Tell us about yourself"
										/>
									</div>

									<div className="pt-6 border-t border-gray-200 dark:border-gray-700">
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
											Change Password
										</h3>

										<div className="space-y-4">
											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													New Password
												</label>
												<input
													type="password"
													name="password"
													value={formData.password}
													onChange={handleChange}
													className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
													placeholder="Leave blank to keep current password"
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Confirm New Password
												</label>
												<input
													type="password"
													name="confirmPassword"
													value={formData.confirmPassword}
													onChange={handleChange}
													className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
													placeholder="Confirm your new password"
												/>
											</div>
										</div>
									</div>

									<button
										type="submit"
										disabled={loading}
										className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-medium"
									>
										{loading ? (
											<>
												<Loader2 className="w-5 h-5 animate-spin" />
												<span>Updating...</span>
											</>
										) : (
											<>
												<Save className="w-5 h-5" />
												<span>Save Changes</span>
											</>
										)}
									</button>
								</form>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Profile;
