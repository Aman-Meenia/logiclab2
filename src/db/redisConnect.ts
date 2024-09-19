import { Redis } from "ioredis";

const redis = new Redis({
  port: 6379,
  host: "localhost",
  password: process.env.REDIS_PASSWORD,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});
console.log("<-------------------- REDIS ----------------------->");
console.log(redis);
redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

redis.on("connect", () => {
  console.log("Successfully connected to Redis");
});

export default redis;
