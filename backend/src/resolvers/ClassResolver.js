import { AuthenticationError, ForbiddenError } from "apollo-server";
import { ClassModel, StudentModel, TeacherModel } from "../models";
import { randCode } from "../utils/constants";

const ClassRsolver = {
	Query: {
		class: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth)
				return await ClassModel.findOne(args.filter)
					.populate("attendences")
					.populate("teacher")
					.exec();
			else return ForbiddenError("User not found");
		},
		classes: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) {
				if (auth.type === "student") {
					const student = await TeacherModel.findById(auth.id)
						.populate("classes")
						.exec();
					return student.classes;
				} else {
					const teacher = await TeacherModel.findById(auth.id)
						.populate("classes")
						.exec();
					return teacher.classes;
				}
			} else return ForbiddenError("User not found");
		},
		createClass: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) {
				const teacher = await TeacherModel.findById(auth.id).exec();
				const classIns = new ClassModel({
					title: args.title,
					teacher,
					code: randCode(),
				});
				await classIns.save();
				await TeacherModel.findOneAndUpdate(args.filter, {
					$push: { classes: classIns },
				});
				return classIns;
			} else return new AuthenticationError("Token not valid");
		},
		students: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) {
				const classIns = await ClassModel.findOne(args.filter)
					.populate("students")
					.exec();
				return classIns.students;
			} else return ForbiddenError("User not found");
		},
		joinClass: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) {
				const classIns = await ClassModel.findOne(
					args.filter
				).exec();
				await StudentModel.findOneAndUpdate(args.filter, {
					$push: { classes: classIns },
				});
				return true;
			} else return new AuthenticationError("Token not valid");
		},
	},
};

export default ClassRsolver;
