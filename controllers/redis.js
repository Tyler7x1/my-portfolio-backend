import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

const CLOUD_REDIS_URL = process.env.REDIS_URL;
const exTime = 60 * 60 * 6; // 6 hours

if (!CLOUD_REDIS_URL) {
  throw new Error("REDIS_URL is not set in environment variables");
}

const redis = new Redis(CLOUD_REDIS_URL);

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

function setter(key, value) {
  return redis.set(key, value, "EX", exTime);
}

function getter(key) {
  return redis.get(key);
}

export { setter, getter };
