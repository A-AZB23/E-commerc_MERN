import express from "express";
import { login, register } from "../services//userService";
import { request } from "http";

const router = express.Router();


router.post("/register", async (request, response) => {
  const { fullName, email, password, phoneNumber } = request.body;
  const { statusCode, data } = await register({
    fullName,
    email,
    password,
    phoneNumber
  });
  response.status(statusCode).send(data);
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const { statusCode, data } = await login({ email, password });
  response.status(statusCode).send(data);
});


export default router;
