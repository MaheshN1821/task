import User from "../models/User.js";
import logger from "../utils/logger.js";

export const updateProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (user) {
			user.name = req.body.name || user.name;
			user.avatar = req.body.avatar || user.avatar;
			user.bio = req.body.bio || user.bio;

			if (req.body.email && req.body.email !== user.email) {
				const emailExists = await User.findOne({ email: req.body.email });
				if (emailExists) {
					return res.status(400).json({ message: "Email already in use" });
				}
				user.email = req.body.email;
			}

			if (req.body.password) {
				user.password = req.body.password;
			}

			const updatedUser = await user.save();

			logger.info(`User profile updated: ${updatedUser.email}`);

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				avatar: updatedUser.avatar,
				bio: updatedUser.bio,
				role: updatedUser.role,
			});
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		logger.error(`Update profile error: ${error.message}`);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteAccount = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (user) {
			await user.deleteOne();
			logger.info(`User account deleted: ${user.email}`);
			res.json({ message: "User account deleted successfully" });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		logger.error(`Delete account error: ${error.message}`);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
