import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperience extends Document {
  position: string;
  company: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  companyLogo?: {
    url: string;
    publicId?: string;
  };
  companyWebsite?: string;
  status: "published" | "draft";
  order: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    position: { type: String, required: true },
    company: { type: String, required: true },
    employmentType: { type: String, default: "internship" },
    location: { type: String, default: "Chennai, India" },
    startDate: { type: String, required: true },
    endDate: { type: String, default: "" },
    current: { type: Boolean, default: false },
    description: { type: String, default: "" },
    responsibilities: [{ type: String }],
    technologies: [{ type: String }],
    companyLogo: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    companyWebsite: { type: String, default: "" },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    order: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Experience: Model<IExperience> =
  mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);
