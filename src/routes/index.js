const router = require("express-promise-router")();
const { registerUser, login, resetPassword } = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login", login);
router.post("/resetPassword", resetPassword);

module.exports = router;
