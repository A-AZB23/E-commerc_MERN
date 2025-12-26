import mongoose, { Schema, ObjectId, Document } from "mongoose";
import { IProduct } from "./productModel";

const cartStatusEnum = ["active", "completed"];

export interface ICartItem  {
  products: IProduct;
  unitPrice: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: ObjectId | string;
  items: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
  products: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  unitPrice: { type: Number, required: true, default: 1 },
  quantity: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: cartStatusEnum, default: "active" },
});

export const cartModel = mongoose.model<ICart>("Cart", cartSchema);
