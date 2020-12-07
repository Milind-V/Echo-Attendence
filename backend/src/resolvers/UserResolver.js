import { AuthenticationError, ForbiddenError } from "apollo-server";
import { StudentModel, TeacherModel } from "../models";
import {
	createJwt,
	authenticateGoogle,
	saveToRedis,
	deteteFromRedis,
} from "../utils/passport";

const UserResolvers = {
	Query: {
		meTeacher: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth)
				return await TeacherModel.findById(auth.id)
					.populate("classes")
					.exec();
			else return new AuthenticationError("Token not valid");
		},
		meStudent: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth)
				return await StudentModel.findById(auth.id)
					.populate("classes")
					.exec();
			else return new AuthenticationError("Token not valid");
		},
		student: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth)
				return await StudentModel.findOne(args.filter)
					.populate("classes")
					.exec();
			else return ForbiddenError("User not found");
		},
		authGoogle: async (parent, args, context) => {
			context.req.body = {
				...context.req.body,
				access_token: args.accessToken,
			};
			const { data, info } = await authenticateGoogle(
				context.req,
				context.res
			);
			if (data) {
				if (args.rollno) {
					let user = await StudentModel.findOne({
						email: data.profile.emails[0].value,
					}).exec();
					if (user !== null) {
						const token = createJwt(
							user.id,
							user.email,
							"student"
						);
						await saveToRedis(user.id, token);
						return token;
					}
					user = new StudentModel({
						firstName: data.profile.name.givenName,
						lastName: data.profile.name.familyName,
						email: data.profile.emails[0].value,
						googleProvider: {
							id: data.profile.id,
							token: args.accessToken,
						},
						rollno: args.rollno,
					});
					user = await user.save();
					const token = createJwt(
						user.id,
						user.email,
						"student"
					);
					await saveToRedis(user.id, token);
					return token;
				}
				let user = await TeacherModel.findOne({
					email: data.profile.emails[0].value,
				}).exec();
				if (user !== null) {
					const token = createJwt(
						user.id,
						user.email,
						"teacher"
					);
					await saveToRedis(user.id, token);
					return token;
				}
				user = new TeacherModel({
					firstName: data.profile.name.givenName,
					lastName: data.profile.name.familyName,
					email: data.profile.emails[0].value,
					googleProvider: {
						id: data.profile.id,
						token: args.accessToken,
					},
				});
				user = await user.save();
				const token = createJwt(user.id, user.email, "teacher");
				await saveToRedis(user.id, token);
				return token;
			}
			if (info) {
				switch (info.code) {
					case "ETIMEDOUT":
						return new AuthenticationError(
							"Failed to reach Google: Try Again"
						);
					default:
						return new AuthenticationError(info.message);
				}
			}
			return new AuthenticationError("Server error");
		},
		logout: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) {
				await deteteFromRedis(auth.id, context.token);
				return true;
			} else return new AuthenticationError("Token not valid");
		},
	},
};

export default UserResolvers;
