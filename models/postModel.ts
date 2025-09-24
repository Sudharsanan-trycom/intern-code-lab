import { Schema, model, Document } from "mongoose";

export interface PostDoc extends Document {
  tenantName: string;
  title: string;
  content: string;
  createdAt: Date;
}

const allowedTenants = ["tenantA", "tenantB"];

const PostSchema = new Schema<PostDoc>({
  tenantName: {
    type: String,
    required: true,
    enum: {
      values: allowedTenants,
      message: "Tenant `{VALUE}` is not allowed",
    },
  },
  title: { 
    type: String, 
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters"], 
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  content: { 
    type: String, 
    required: [true, "Content is required"], 
    minlength: [5, "Content must be at least 5 characters"] 
  },
  createdAt: { type: Date, default: Date.now },
});

export const PostModel = model<PostDoc>("Post", PostSchema);
