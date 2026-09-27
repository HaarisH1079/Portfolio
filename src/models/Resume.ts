import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResume extends Document {
  fileName: string;
  fileUrl: string;
  storageProvider: string;
  publicId?: string;
  version: number;
  isCurrent: boolean;
  notes?: string;
  fileSize?: string;
  uploadedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    storageProvider: { type: String, default: "local" },
    publicId: { type: String, default: "" },
    version: { type: Number, required: true, default: 1 },
    isCurrent: { type: Boolean, default: true },
    notes: { type: String, default: "" },
    fileSize: { type: String, default: "245 KB" },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Resume: Model<IResume> =
  mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);
