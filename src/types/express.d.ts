// src/types/express.d.ts

import { Document, Types } from "mongoose";

// Define the shape of your User Mongoose Document
// Including _id and making password optional since it's typically excluded after auth
export interface IUser extends Document {
  _id: string; // Mongoose Document has _id
  fullName: string;
  email: string;
  password?: string; // Optional because we usually don't fetch it
  phoneNumber: string;
}

// Type for lean user object (returned by .lean())
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
