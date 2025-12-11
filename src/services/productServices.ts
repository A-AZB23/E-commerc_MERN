import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedIntialProducts = async () => {
  const products = [
    {
      title: "IPHONE 17 ",
      image:
        "https://i.pinimg.com/1200x/d8/35/c3/d835c3944ca58d05e142b396f18a146c.jpg",
      price: 150000,
      stock: 5,
    },
  ];

  const existingProducts = await getAllProducts();

  if (existingProducts.length === 0) {
    await productModel.insertMany(products);
  }
};
