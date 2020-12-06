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
	classes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "class",
		},
	],
});

const studentSchema = new mongoose.Schema({
	...userSchema.obj,
	rollno: {
		type: String,
		required: false,
		unique: true,
	},
});

const teacherSchema = new mongoose.Schema({
	...userSchema.obj,
});

const StudentModel = mongoose.model("student", studentSchema);
const TeacherModel = mongoose.model("teacher", teacherSchema);

export { StudentModel, TeacherModel };
