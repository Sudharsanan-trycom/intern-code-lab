import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();
  console.log("✅ Redis connected");
})();

export const setCache = async (key: string, value: any, ttlSeconds: number) => {
  const data = JSON.stringify({
    timestamp: new Date().toISOString(),
    value,
  });
  await redisClient.set(key, data, { EX: ttlSeconds });
};

export const getCache = async (key: string) => {
  const data = await redisClient.get(key);
  if (!data) return null;
  return JSON.parse(data); 
};

export default redisClient;
