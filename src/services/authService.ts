// src/services/authService.ts

import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// IMPORTANT: Use environment variable for the secret key!
const JWT_SECRET = "AaZzBbOKokAAABbehhEhhEHHH";

const generateJWT = (data: { fullName: string; email: string; _id?: any }) => {
  // Include the user's ID for better cart fetching/identification
  return jwt.sign(data, JWT_SECRET);
};

interface RegisterParams {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}
export const register = async ({
  fullName,
  email,
  password,
  phoneNumber,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User is already FOUND", statusCode: 400 };
  }

  const hashedPaswword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    fullName,
    email,
    password: hashedPaswword,
    phoneNumber,
  });
  await newUser.save();

  // FIX: Include _id in the JWT payload
  return { data: generateJWT({ fullName, email, _id: newUser._id }), statusCode: 200 };
};

interface LoginParams {
  email: string;
  password: string;
}
export const login = async ({ email, password }: LoginParams) => {
  // Select the password field explicitly as it's often excluded in the schema default
  const findUser = await userModel.findOne({ email }).select('+password'); 

  if (!findUser) {
    return { data: "Incorrect email and password", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    // FIX: Include _id in the JWT payload
    return {
      data: generateJWT({ email, fullName: findUser.fullName, _id: findUser._id }),
      statusCode: 200,
    };
  }
  return { data: "Incorrect email and password", statusCode: 400 };
};