const image = require("../models/image");
const path = require("path");
const fs = require("fs");

module.exports = {
	uploadImage: (req, res) => {
		const body = req.body;
		console.log(body);
		if (!req.file) {
			res.status(400).json({
				success: false,
				message: "Empty file...",
			});
			return;
		}
		const img = new image({
			userId: body.userId,
			title: body.title,
			description: body.description,
			filename: req.file.filename,
			path: `/uploads/${req.file.filename}`,
			created: Date.now(),
		});
		img.save((err, img) => {
			if (err) {
				res.status(500).json({
					success: false,
					message: "An error was ocurred...",
					err,
				});
			}
			res.status(200).json({
				success: true,
				message: "The image was uploaded successfully",
				user: req.user,
				img,
			});
		});
	},
	updateImage: async (req, res) => {
		try {
			let body = req.body;
			let filter = { _id: body.imageID };
			let newData = {
				title: body.title,
				description: body.description,
			};
			let resp = await image.updateOne(filter, newData);
			return res.status(200).json({
				success: true,
				message: "Image updated successfully",
				resp,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				success: false,
				message: "An error was ocurred...",
				err,
			});
		}
	},
	getUserImages: async (req, res) => {
		try {
			let query = req.query;
			let userImages = await image.find({ userId: query.userId });
			res.status(200).json({
				success: true,
				message: "Images obtained succesfully",
				userImages,
			});
		} catch (e) {
			console.log(e);
			res.status(500).json({
				success: false,
				message: "An error was ocurred...",
				e,
			});
		}
	},
	deleteImage: async (req, res) => {
		try {
			let body = req.body;
			console.log(body);
			fs.unlinkSync(path.join(__dirname, `../public/uploads/${body.imageName}`));
			let resp = await image.deleteOne({ _id: body.imageID });
			res.status(200).json({
				success: true,
				message: "Image deleted successfully...",
				resp,
			});
		} catch (e) {
			console.log(e);
			res.status(500).json({
				success: false,
				message: "An error as ocurred...",
				e,
			});
		}
	},
	getImageURL: (req, res) => {
		res.sendFile(path.join(__dirname, `../public/uploads/${req.query.img}`));
	},
};
