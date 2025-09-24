import { Router } from "express";
import rateLimit from "express-rate-limit";
import { getPosts } from "../controllers/postController";

const router = Router();

// Express rate limit: max 5 requests per minute per IP
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests from this IP, please try again later."
});

router.get("/", apiLimiter, getPosts);

export default router;
