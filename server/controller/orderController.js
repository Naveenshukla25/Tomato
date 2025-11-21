import orderModal from "../modal/orderModal.js";
import userModal from "../modal/userModal.js";
import stripe from "stripe";

export const placeorder = async (req, res) => {
  try {
    const order = await orderModal.insertOne(req.body);
    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: "error in placing order" });
  }
};

export const userorder = async (req, res) => {
  try {
    const order = await orderModal.find({});
    res.json({ success: true, data: order });
  } catch (error) {
    res.json({ success: false, message: "error in getting order" });
  }
};
