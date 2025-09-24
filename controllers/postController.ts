import { Request, Response } from "express";
import { fetchPosts } from "../externalServices/externalApi";
import { getCache, setCache } from "../externalServices/cacheService";
import logger from "../externalServices/logger";
import { getPostsByTenant, createPost} from "../services/postService"

export const getPostsFromExternalApi = async (request: Request, response: Response) => {
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

export const createPostHandler = async (req: Request, res: Response) => {
  const tenantName = (req as any).tenantName; 
  const { title, content } = req.body;
  const post = await createPost(tenantName, title, content);
  res.json(post);
};

export const getPostsHandler = async (req: Request, res: Response) => {
  const tenantName = (req as any).tenantName; 
  const posts = await getPostsByTenant(tenantName);
  res.json(posts);
};
