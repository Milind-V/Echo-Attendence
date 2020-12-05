import dotenv from "dotenv";
import mongoose from "mongoose";
import Redis from "ioredis";
import JSONCache from "redis-json";
// Dotenv config
dotenv.config();

const { MONGODB_URI, REDIS_HOST, REDIS_PORT } = process.env;

// MongoDB
mongoose.Promise = global.Promise;

const mongo = {
	db: null,
	async connect() {
		mongoose.set("useCreateIndex", true);
		if (this.db === null) {
			this.db = await mongoose.connect(MONGODB_URI, {
				autoIndex: true,
				poolSize: 50,
				bufferMaxEntries: 0,
				keepAlive: 120,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
		}
	},
	async disconnect() {
		if (this.db !== null) {
			await this.db.disconnect();
			this.db = null;
		}
	},
};
// Redis
const redisCache = new Redis({ host: REDIS_HOST, port: REDIS_PORT });
const redis = new JSONCache(redisCache);

export { mongo, redis };
