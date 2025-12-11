import express, { response } from "express";
import { request } from "http";
import { getAllProducts } from "../services/productServices";

const router = express.Router();

router.get("/", async (request, response) => {
  const products = await getAllProducts();
  response.status(200).send(products);
});
export default router;
