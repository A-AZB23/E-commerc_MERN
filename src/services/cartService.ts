// src/services/cartService.ts

import { cartModel } from "../models/cartModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  // Note: Using findOneAndUpdate with upsert: true can be a cleaner alternative
  const cart = await cartModel.create({ userId });
  // The .create method typically saves the document, so .save() might be redundant 
  // await cart.save(); 
  return cart;
};

interface GetUserCart {
  userId: string;
}

export const getUserCart = async ({ userId }: GetUserCart) => {
  // Find an active cart for the user
  let cart = await cartModel.findOne({ userId, status: "active" });

  if (!cart) {
    // If no active cart is found, create a new one
    cart = await createCartForUser({ userId });
  }
  return cart;
};