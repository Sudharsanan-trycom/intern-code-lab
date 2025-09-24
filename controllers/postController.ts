import { Request, Response } from "express";
import { fetchPosts } from "../services/externalApi";
import { getCache, setCache } from "../services/cacheService";
import logger from "../services/logger";

export const getPosts = async (request: Request, response: Response) => {
  try {
    const clientIP = request.ip || request.headers['x-forwarded-for'] || 'unknown';
    const cacheKey = `posts_${clientIP}`;
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      logger.info(`Cache hit for key: ${cacheKey}`);
      return response.status(200).send({
        source: "cache",
        timestamp: cachedData.timestamp,
        data: cachedData.value,
      });
    }

    const posts = await fetchPosts();

    await setCache(cacheKey, posts, 60);
    logger.info(`Fetched posts from external API and cached with key: ${cacheKey}`);

    response.status(200).send({
      source: "api",
      timestamp: new Date().toISOString(),
      data: posts,
    });
  } catch (error) {
    logger.error(`Failed to fetch posts: ${error}`);
    response.status(500).send({ message: "Failed to fetch posts" });
  }
};

