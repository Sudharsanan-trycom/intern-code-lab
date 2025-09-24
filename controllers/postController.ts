import { Request, Response } from "express";
import { fetchPosts } from "../services/externalApi";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await fetchPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};
