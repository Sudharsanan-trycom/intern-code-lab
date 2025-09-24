import { Router } from "express";
import rateLimit from "express-rate-limit";
import { createPostHandler, getPostsFromExternalApi, getPostsHandler } from "../controllers/postController";
import { tenantMiddleware } from  "../middleware/tenantMiddleware"
const router = Router();

// Express rate limit: max 5 requests per minute per IP
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests from this IP, please try again later."
});

router.get("/external-api", apiLimiter, getPostsFromExternalApi);
router.get("/:tenantName" , tenantMiddleware, getPostsHandler);
router.post("/:tenantName", tenantMiddleware, createPostHandler);

export default router;
