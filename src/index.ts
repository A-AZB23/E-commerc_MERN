import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import productRoute from "./routes/productRoutes";
import cartRoute from "./routes/cartRoutes";
import { seedIntialProducts } from "./services/productServices";

const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/E-commerce")
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB failed ❌", err));

//seed the products to DB
seedIntialProducts();

app.use("/user", userRoute);
app.use("/products", productRoute);
app.use("/Cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
