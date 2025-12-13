// src/types/express.d.ts

import { Document } from "mongoose";

// Define the shape of your User Mongoose Document
// Including _id and making password optional since it's typically excluded after auth
export interface IUser extends Document {
  _id: string; // Mongoose Document has _id
  fullName: string;
  email: string;
  password?: string; // Optional because we usually don't fetch it
  phoneNumber: string;
}

// Augment the 'express-serve-static-core' module (where Request is defined)
declare namespace Express {
  export interface Request {
    /**
     * The authenticated user object fetched from the database
     */
    user?: IUser | null;
  }
}