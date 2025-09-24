import mongoose, { Schema, Model, Document } from "mongoose";

export interface PostDoc extends Document {
  title: string;
  content: string;
  createdAt: Date;
}

const basePostSchema = new Schema<PostDoc>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const tenantModels: { [tenant: string]: Model<PostDoc> } = {};

export const getTenantPostModel = (tenantName: string): Model<PostDoc> => {
  if (!tenantModels[tenantName]) {
    tenantModels[tenantName] = mongoose.model<PostDoc>(
      `${tenantName}_Post`,
      basePostSchema,
      `${tenantName}_posts`
    );
  }
  return tenantModels[tenantName];
};
