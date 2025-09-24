import { PostModel, PostDoc } from "../models/postModel";

export const createPost = async (tenantName: string, title: string, content: string): Promise<PostDoc> => {
  const post = new PostModel({ tenantName, title, content });
  return post.save();
};

export const getPostsByTenant = async (tenantName: string): Promise<PostDoc[]> => {
  return PostModel.find({ tenantName }).sort({ createdAt: -1 });
};
