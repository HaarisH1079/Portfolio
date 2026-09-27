import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactSetting extends Document {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  instagram: string;
  availability: string;
  formEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSettingSchema = new Schema<IContactSetting>(
  {
    email: { type: String, required: true, default: "haarishnandakumar@gmail.com" },
    phone: { type: String, default: "+91 98765 43210" },
    location: { type: String, default: "Chennai, India" },
    linkedin: { type: String, default: "https://linkedin.com/in/haarish-nandakumar" },
    github: { type: String, default: "https://github.com/HaarishNK" },
    instagram: { type: String, default: "https://instagram.com/haarish_nk" },
    availability: { type: String, default: "Open to Full-Time Engineering & Graduate Roles" },
    formEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ContactSetting: Model<IContactSetting> =
  mongoose.models.ContactSetting ||
  mongoose.model<IContactSetting>("ContactSetting", ContactSettingSchema);
