import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { IUser } from "../types/express.d"; 

const JWT_SECRET: string = "AaZzBbOKokAAABbehhEhhEHHH";

interface JWTUserPayload {
  _id: string;
  email: string;
  fullName: string;
  iat: number;
}

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");


  if (!authorizationHeader) {
    return res.status(403).send("Authorization Header wasn't provided");
  }

  const parts = authorizationHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(403)
      .send("Authorization header format is 'Bearer <token>'");
  }
  const token = parts[1]!; // Non-null assertion: we've validated parts.length === 2

  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    if (!payload) {
      return res.status(403).send("No token payload");
    }

    const userPayload = payload as JWTUserPayload;

    const user = await userModel.findOne({ email: userPayload.email }).lean();

    if (!user) {
      return res.status(403).send("User not found in database.");
    }

    req.user = user;

    next();
  });
};

export default validateJWT;
