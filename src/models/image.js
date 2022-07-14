const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	title: { type: String },
	description: { type: String },
	filename: { type: String },
	path: { type: String },
	created: { type: Date },
});

module.exports = model("image", imageSchema);
