import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverImage?: {
    url: string;
    publicId?: string;
  };
  gallery?: {
    url: string;
    publicId?: string;
  }[];
  category: string;
  type: string;
  technologies: string[];
  problem?: string;
  solution?: string;
  architecture?: string;
  challenges?: string;
  results?: string;
  futureImprovements?: string;
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  featured: boolean;
  status: "published" | "draft" | "archived";
  order: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    gallery: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    category: { type: String, required: true, default: "Full-Stack" },
    type: { type: String, default: "personal" },
    technologies: [{ type: String }],
    problem: { type: String, default: "" },
    solution: { type: String, default: "" },
    architecture: { type: String, default: "" },
    challenges: { type: String, default: "" },
    results: { type: String, default: "" },
    futureImprovements: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "published",
    },
    order: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
