const router = require("express-promise-router")();

router.get("/", (req, res) => {
	return res.status(200).json({ message: "hello world" });
});

module.exports = router;
