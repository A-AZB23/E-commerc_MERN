// src/routes/cartRouter.ts

import express from "express";
import { addItemToCart, getUserCart } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.get("/", validateJWT, async (req, res) => {
  // Safety check: ensure the user object was successfully attached
  if (!req.user || !req.user._id) {
    return res.status(401).send("Authentication failure: User ID missing.");
  }

  try {
    // FIX: Use the authenticated user's ID from the request object
    const cart = await getUserCart({ userId: req.user._id.toString() });
    res.status(200).send(cart);  } 
  catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

interface CartResponse {
    statusCode: number;
    data: any;
}


router.post("/items", validateJWT, async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).send("Authentication failure: User ID missing.");
  }

const userId = req.user._id.toString();
const { productId, quantity } = req.body;
const response = await addItemToCart({ userId, productId, quantity });

if (!response) {
  return res.status(500).send("Internal Server Error");
}

res.status(response.statusCode).send(response.data);
});

export default router;
