import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadUser = async () => {
			const token = localStorage.getItem("token");
			const storedUser = localStorage.getItem("user");

			if (token && storedUser) {
				try {
					setUser(JSON.parse(storedUser));
					const response = await authAPI.getMe();
					setUser(response.data);
					localStorage.setItem("user", JSON.stringify(response.data));
				} catch (error) {
					localStorage.removeItem("token");
					localStorage.removeItem("user");
					setUser(null);
				}
			}
			setLoading(false);
		};

		loadUser();
	}, []);

	const login = async (email, password) => {
		try {
			const response = await authAPI.login({ email, password });
			const { token, ...userData } = response.data;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(userData));
			setUser(userData);
			return { success: true };
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.message || "Login failed",
			};
		}
	};

	const register = async (name, email, password) => {
		try {
			const response = await authAPI.register({ name, email, password });
			const { token, ...userData } = response.data;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(userData));
			setUser(userData);
			return { success: true };
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.message || "Registration failed",
			};
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
	};

	const updateUser = (userData) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
	};

	const value = {
		user,
		loading,
		login,
		register,
		logout,
		updateUser,
		isAuthenticated: !!user,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
