import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<Router>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/tasks"
							element={
								<ProtectedRoute>
									<Tasks />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/profile"
							element={
								<ProtectedRoute>
									<Profile />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/settings"
							element={
								<ProtectedRoute>
									<Settings />
								</ProtectedRoute>
							}
						/>
						<Route path="/" element={<Navigate to="/dashboard" replace />} />
						<Route path="*" element={<Navigate to="/dashboard" replace />} />
					</Routes>
				</Router>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;
