import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { flushCompileCache } from "module";

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

  return { data: generateJWT({ fullName, email }), statusCode: 200 };
};

interface LoginParams {
  email: string;
  password: string;
}
export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "Incorrect email and password", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    return {
      data: generateJWT({ email, fullName: findUser.fullName }),
      statusCode: 200,
    };
  }
  return { data: "Incorrect email and password", statusCode: 400 };
};

const generateJWT = (data: any) => {
  return jwt.sign(data, "AaZzBbOKokAAABbehhEhhEHHH");
};
