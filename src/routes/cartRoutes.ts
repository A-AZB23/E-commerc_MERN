// src/routes/cartRouter.ts

import express from "express";
import { getUserCart } from "../services/cartService";
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
    res.status(200).send(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;