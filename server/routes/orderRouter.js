import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeorder,
  userOrders,
  listOrders,
  updateStatus,
  userorder,
} from "../controller/orderController.js";

const orderRouter = express.Router();

// Customer order routes (require authentication and only return the logged-in user's orders)
orderRouter.post("/place", authMiddleware, placeorder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/userorders", authMiddleware, userOrders);
orderRouter.post("/userorder", authMiddleware, userOrders);
orderRouter.get("/userorder", authMiddleware, userOrders);

// Admin order routes (fetch all orders across all users)
orderRouter.get("/list", listOrders);
orderRouter.get("/allorders", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
