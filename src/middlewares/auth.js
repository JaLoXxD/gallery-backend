const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

module.exports = {
	verifyToken: (req, res, next) => {
		let token = req.headers.authorization || "";
		jwt.verify(token, TOKEN_KEY, (err, userDecoded) => {
			if (err) {
				return res.status(401).json({
					success: false,
					message: "Invalid token...",
					err,
				});
			}
			req.user = userDecoded.user;
			next();
		});
	},
};
