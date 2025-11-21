import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeorder, userorder } from "../controller/orderController.js";

const orderRouter = express.Router();
orderRouter.post("/place", authMiddleware, placeorder);
orderRouter.get("/userorder", userorder);

export default orderRouter;
