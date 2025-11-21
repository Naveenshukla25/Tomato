import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRouter.js";
import "dotenv/config.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";

// app  config
const app = express();
const PORT = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();
//api endpoint
app.use("/api/food", foodRouter);
app.use("/image", express.static("upload"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API");
});

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
