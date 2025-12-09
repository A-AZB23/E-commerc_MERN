import mongoose, { Schema, Document } from "mongoose";
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

export const userModel = mongoose.model<IUser>("User", userSchema);
