import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import logger from "../utils/logger.js";

export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		const user = await User.create({
			name,
			email,
			password,
		});

		if (user) {
			logger.info(`New user registered: ${user.email}`);
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				bio: user.bio,
				role: user.role,
				token: generateToken(user._id),
			});
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
	} catch (error) {
		logger.error(`Register error: ${error.message}`);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email }).select("+password");

		if (user && (await user.matchPassword(password))) {
			logger.info(`User logged in: ${user.email}`);
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				bio: user.bio,
				role: user.role,
				token: generateToken(user._id),
			});
		} else {
			res.status(401).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		logger.error(`Login error: ${error.message}`);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (user) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				bio: user.bio,
				role: user.role,
			});
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		logger.error(`Get profile error: ${error.message}`);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
