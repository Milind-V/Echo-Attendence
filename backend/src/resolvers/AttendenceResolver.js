import { AuthenticationError, ForbiddenError } from "apollo-server";
import { AttendenceModel, ClassModel, StudentModel } from "../models";

const AttendenceResolver = {
	Query: {
		attendences: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) {
				const classIns = await ClassModel.findOne(args.filter)
					.populate("attendences")
					.populate("students")
					.exec();
				return classIns.attendences;
			} else return new AuthenticationError("Token not valid");
		},
		takeAttendence: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) {
				const classIns = await ClassModel.findOne(
					args.filter
				).exec();
				const attendence = new AttendenceModel({
					class: classIns,
					date: Date.now(),
				});
				await attendence.save();
				await ClassModel.findOneAndUpdate(args.filter, {
					$push: { attendences: attendence },
				});
				return attendence;
			} else return new AuthenticationError("Token not valid");
		},
		markAttendence: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) {
				const student = await StudentModel.findById(auth.id).exec();
				await AttendenceModel.findOneAndUpdate(args.filter, {
					$push: { students: student },
				});
				return true;
			} else return new AuthenticationError("Token not valid");
		},
	},
};

export default AttendenceResolver;
