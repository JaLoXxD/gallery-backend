const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "public/uploads"));
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}.jpg`);
	},
});

module.exports = multer({
	storage: storage,
	dest: path.join(__dirname, "public/uploads"),
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|gif|webp/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(path.extname(file.originalname));
		if (mimetype && extname) {
			return cb(null, true);
		}
		cb("Error: The image is invalid");
	},
}).single("image");
