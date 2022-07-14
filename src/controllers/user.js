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
};
