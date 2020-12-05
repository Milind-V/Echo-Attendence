import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
	class: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "class",
	},
	date: { type: Date, default: Date.now },
	students: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "student",
		},
	],
});

const AttendenceModel = mongoose.model("attendence", attendenceSchema);

export default AttendenceModel;
