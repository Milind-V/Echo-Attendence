import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
		unique: true,
	},
	title: {
		type: String,
		required: true,
	},
	teacher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "teacher",
	},
	students: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "student",
		},
	],
	attendences: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "attendence",
		},
	],
});

const ClassModel = mongoose.model("class", classSchema);

export default ClassModel;
