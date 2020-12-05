import { AuthenticationError, ForbiddenError } from "apollo-server";
import { UserModel } from "../models";
import { createJwt, authenticateGoogle } from "../utils/passport";
import { redis } from "../utils/db";

const saveToRedis = async (id, token) => {
	const redisData = await redis.get(id);
	if (redisData !== undefined) {
		const arr = redisData["access_tokens"];
		arr.push(token);
		await redis.set(id, { access_tokens: arr });
	} else {
		await redis.set(id, {
			access_tokens: [token],
		});
	}
};

const UserResolvers = {
	Query: {
		me: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) return await UserModel.findById(auth.id).exec();
			else return new AuthenticationError("Token not valid");
		},

		user: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) return await UserModel.findOne(args.filter).exec();
			else return ForbiddenError("User not found");
		},

		users: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) return await UserModel.find(args.filter).exec();
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
				let user = await UserModel.findOne({
					email: data.profile.emails[0].value,
				}).exec();
				if (user !== null) {
					const token = createJwt(user.id, user.email);
					await saveToRedis(user.id, token);
					return token;
				}
				user = new UserModel({
					firstName: data.profile.name.givenName,
					lastName: data.profile.name.familyName,
					email: data.profile.emails[0].value,
					profilePic: data.profile._json.picture,
					googleProvider: {
						id: data.profile.id,
						token: args.accessToken,
					},
				});
				user = await user.save();
				const token = createJwt(user.id, user.email);
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
				const redisData = await redis.get(auth.id);
				const token = context.token;
				const arr = redisData["access_tokens"].filter(
					(v) => v !== token
				);
				await redis.rewrite(auth.id, { access_tokens: arr });
				return true;
			} else return new AuthenticationError("Token not valid");
		},

		deleteAccount: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) {
				if (args.filter) {
					const users = await UserModel.find(args.filter).exec();
					if (users && users.length > 0) {
						await users.forEach(async (v) => {
							await redis.rewrite(v._id, {
								access_tokens: [],
							});
						});
						await UserModel.deleteMany(args.filter).exec();
						return true;
					} else return ForbiddenError("User not found");
				}
				await redis.rewrite(auth.id, { access_tokens: [] });
				const user = await UserModel.deleteOne({
					_id: auth.id,
				}).exec();
				return user.deletedCount > 0;
			} else return new AuthenticationError("Token not valid");
		},
	},
	Mutation: {
		updateUser: async (parent, args, context) => {
			const auth = context.isAuth;
			if (auth) {
				const user = await UserModel.updateOne(args.filter, {
					$set: args.input,
				}).exec();
				return true;
			} else return new AuthenticationError("Token not valid");
		},
	},
};

export default UserResolvers;
