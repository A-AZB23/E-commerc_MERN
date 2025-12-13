// src/middlewares/validateJWT.ts

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
// Import the custom User Interface for type safety
import { IUser } from "../types/express.d"; 

// IMPORTANT: Use environment variable for the secret key!
const JWT_SECRET = "AaZzBbOKokAAABbehhEhhEHHH";

// Type alias for the decoded JWT payload
interface JWTUserPayload {
  _id: string;
  email: string;
  fullName: string;
  iat: number; 
}

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");
  
  // 1. Check for Header
  if (!authorizationHeader) {
    return res.status(403).send("Authorization Header wasn't provided");
  }

  // 2. Check for Token Format (Bearer ...)
  const parts = authorizationHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
     return res.status(403).send("Authorization header format is 'Bearer <token>'");
  }
  const token = parts[1];

  // 3. Verify Token
  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    if (!payload) {
      return res.status(403).send("No token payload");
    }

    // 4. Find User in DB
    const userPayload = payload as JWTUserPayload;
    
    // Find the user object (excluding the password)
    // Using .lean() for performance since we don't need Mongoose document methods
    const user = await userModel.findOne({ email: userPayload.email }).lean();

    if (!user) {
      return res.status(403).send("User not found in database.");
    }

    // 5. Attach User to Request (The fix for req.user error)
    req.user = user as IUser; 
    
    // 6. Proceed to the next middleware or route handler (The Logic Fix)
    next();
  });
};

export default validateJWT;