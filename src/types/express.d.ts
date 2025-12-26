import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: string; // Mongoose Document has _id
  fullName: string;
  email: string;
  password?: string; // Optional because we usually don't fetch it
  phoneNumber: string;
}

export interface IUserLean {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  __v?: number;
}

// Augment the 'express-serve-static-core' module (where Request is defined)
declare global {
  namespace Express {
    interface Request {
      /**
       * The authenticated user object fetched from the database
       */
      user?: IUserLean | null;
    }
  }
}

export {};
