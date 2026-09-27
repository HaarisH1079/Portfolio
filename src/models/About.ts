import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAbout extends Document {
  name: string;
  professionalTitle: string;
  shortIntroduction: string;
  fullBiography: string;
  location: string;
  profileImage: string;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    instagram?: string;
    twitter?: string;
  };
  currentlyBuilding?: string;
  stats: { label: string; value: string }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>(
  {
    name: { type: String, required: true, default: "Haarish Nandakumar" },
    professionalTitle: { type: String, required: true, default: "Software Developer & Technology Builder" },
    shortIntroduction: { type: String, required: true },
    fullBiography: { type: String, required: true },
    location: { type: String, default: "Chennai, India" },
    profileImage: { type: String, default: "" },
    socialLinks: {
      github: { type: String, default: "https://github.com/HaarishNK" },
      linkedin: { type: String, default: "https://linkedin.com/in/haarish-nandakumar" },
      email: { type: String, default: "haarishnandakumar@gmail.com" },
      instagram: { type: String, default: "https://instagram.com/haarish_nk" },
      twitter: { type: String, default: "" },
    },
    currentlyBuilding: { type: String, default: "" },
    stats: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);
