import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/E-commerce")
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB failed ❌", err));

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
