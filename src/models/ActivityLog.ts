import mongoose, { Schema, Document, Model } from "mongoose";

export interface IActivityLog extends Document {
  action: "create" | "update" | "delete" | "publish" | "seed";
  entity: "project" | "skill" | "experience" | "lab" | "blog" | "resume" | "about" | "contact" | "system";
  title: string;
  details?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    action: {
      type: String,
      required: true,
      enum: ["create", "update", "delete", "publish", "seed"],
    },
    entity: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    details: { type: String, default: "" },
  },
  { timestamps: true }
);

export const ActivityLog: Model<IActivityLog> =
  mongoose.models.ActivityLog ||
  mongoose.model<IActivityLog>("ActivityLog", ActivityLogSchema);
