import dotenv from "dotenv";
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Strategy: GoogleTokenStrategy } = require("passport-google-token");
const Promise = require("promise");
import { ONE_DAY, THIRTY_DAYS } from "./constants";
import { redis } from "./db";

dotenv.config();
const {
	JWT_SECRET,
	APP_URL,
	NODE_ENV,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
} = process.env;

// JWT
const verifyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: JWT_SECRET,
	audience: APP_URL,
	algorithms: ["HS256"],
};

passport.use(
	new JwtStrategy(verifyOptions, (payload, done) => done(null, payload))
);

const createJwt = (id, email) => {
	const today = new Date();
	const expirationDate = new Date(today);
	expirationDate.setDate(
		today.getDate() + (NODE_ENV === "development" ? ONE_DAY : THIRTY_DAYS)
	);
	const exp = parseInt(expirationDate.getTime() / 1000, 10);
	return jwt.sign({ id, email, exp }, JWT_SECRET, {
		algorithm: "HS256",
		audience: verifyOptions.audience,
	});
};

const authenticate = (req, res) =>
	new Promise((resolve, reject) => {
		passport.authenticate("jwt", (err, payload) => {
			if (err) reject(err);
			resolve(payload);
		})(req, res);
	});

// Google
const GoogleTokenStrategyCallback = (
	accessToken,
	refreshToken,
	profile,
	done
) =>
	done(null, {
		accessToken,
		refreshToken,
		profile,
	});

passport.use(
	new GoogleTokenStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		},
		GoogleTokenStrategyCallback
	)
);

const authenticateGoogle = (req, res) =>
	new Promise((resolve, reject) => {
		passport.authenticate(
			"google-token",
			{ session: false },
			(err, data, info) => {
				if (err) reject(err);
				resolve({ data, info });
			}
		)(req, res);
	});

// isAuth
const isAuth = async (req, res) => {
	const auth = await authenticate(req, res);
	if (auth) {
		const redisData = await redis.get(auth.id);
		if (redisData !== undefined) {
			const token = req.headers.authorization.split(" ")[1];
			if (redisData["access_tokens"].includes(token)) return auth;
			else return false;
		} else return false;
	}
	return false;
};

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

const deteteFromRedis = async (id, token) => {
	const redisData = await redis.get(id);
	const arr = redisData["access_tokens"].filter((v) => v !== token);
	await redis.rewrite(id, { access_tokens: arr });
};
export {
	isAuth,
	saveToRedis,
	deteteFromRedis,
	createJwt,
	authenticate,
	authenticateGoogle,
};
