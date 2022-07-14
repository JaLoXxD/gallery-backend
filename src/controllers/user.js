const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

module.exports = {
	registerUser: (req, res) => {
		const body = req.body;
		const newUser = new user({
			name: body.name,
			mail: body.mail.toLowerCase(),
			password: bcrypt.hashSync(body.password, 10),
			age: body.age,
			created: Date.now(),
		});
		newUser.save((err, user) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: "An error was ocurred in the register...",
					err,
				});
			}
			console.log(user);
			res.status(200).json({
				success: true,
				message: "User registered succesfully...",
				user,
			});
		});
	},
	login: (req, res) => {
		const body = req.body;
		if (!body.mail || !body.password) {
			return res.status(400).json({ success: false, message: "Email or password are empty!" });
		}
		user.findOne({ mail: body.mail }, (err, user) => {
			if (err) {
				return res.status(400).json({
					succes: false,
					err,
				});
			}
			if (!user || !bcrypt.compareSync(body.password, user.password)) {
				return res.status(500).json({
					succes: false,
					message: "Mail or password are incorrect",
					err,
				});
			}
			let token = jwt.sign(
				{
					user,
				},
				TOKEN_KEY,
				{
					expiresIn: "36h",
				}
			);
			return res.status(200).json({
				success: true,
				message: "Login succesfull",
				user,
				token,
			});
		});
	},
	resetPassword: async (req, res) => {
		try {
			let body = req.body;
			let query = { _id: body.userId };
			let newData = { password: bcrypt.hashSync(body.password, 10) };
			let updated = await user.findOneAndUpdate(query, newData).exec();
			res.status(200).json({ success: true, message: "Password updated successfully...", newData, updated });
		} catch (err) {
			res.status(500).json({ success: false, message: "An error was ocurred...", err });
		}
	},
};
