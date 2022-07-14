const router = require("express-promise-router")();
const { registerUser, login, resetPassword } = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login", login);
router.post("/uploadImage", verifyToken, uploadImage);
router.get("/getUserImages", verifyToken, getUserImages);
router.post("/resetPassword", resetPassword);
router.get("/uploads", getImageURL);
router.post("/deleteImage", verifyToken, deleteImage);
router.put("/updateImage", verifyToken, updateImage);

module.exports = router;
