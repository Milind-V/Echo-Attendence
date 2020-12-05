import mongoose from "mongoose";
require("mongoose-type-email");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		unique: false,
	},
	lastName: {
		type: String,
		required: true,
		unique: false,
	},
	email: {
		type: mongoose.SchemaTypes.Email,
		required: true,
		unique: true,
	},
	googleProvider: {
		id: String,
		token: String,
	},
});

const user = mongoose.model("user", userSchema);

export default user;
