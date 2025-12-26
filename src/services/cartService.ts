// src/services/cartService.ts

import { cartModel } from "../models/cartModel";
import { productModel } from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  // Note: Using findOneAndUpdate with upsert: true can be a cleaner alternative
  const cart = await cartModel.create({ userId, totalAmount: 0 });
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

interface addItemToCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: addItemToCart) => {
  const cart = await getUserCart({ userId });

  const existsInCart = cart.items.find(
    (p) => p.products.toString() === productId
  );

  if (existsInCart) {
    return { data: "item alreadry exists in cart", statusCode: 400 };
  }

  const products = await productModel.findById(productId);
  if (!products) {
    return;
  }

  cart.items.push({ products: productId, unitPrice: products.price, quantity });
  
  cart.totalAmount += products.price * quantity;
  await cart.save();
  return { data: cart, statusCode: 200 };
};

export default { getUserCart, addItemToCart };
