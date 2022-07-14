const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
	name: { type: String },
	mail: { type: String, unique: true },
	password: { type: String },
	age: { type: String },
	created: { type: String },
});

userSchema.plugin(uniqueValidator, {
	message: "{PATH} debe de ser unico",
});

module.exports = model("user", userSchema);
