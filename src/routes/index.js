const router = require("express-promise-router")();
const { registerUser } = require("../controllers/user");

router.post("/register", registerUser);

module.exports = router;
