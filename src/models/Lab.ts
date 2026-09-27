import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILab extends Document {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  objective: string;
  description: string;
  technologies: string[];
  images?: {
    url: string;
    publicId?: string;
  }[];
  githubUrl?: string;
  documentationUrl?: string;
  status: "published" | "draft";
  featured: boolean;
  order: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LabSchema = new Schema<ILab>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, default: "Networking" },
    shortDescription: { type: String, required: true },
    objective: { type: String, default: "" },
    description: { type: String, default: "" },
    technologies: [{ type: String }],
    images: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    githubUrl: { type: String, default: "" },
    documentationUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Lab: Model<ILab> =
  mongoose.models.Lab || mongoose.model<ILab>("Lab", LabSchema);
