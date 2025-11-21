import React from "react";
import userModal from "../modal/userModal.js";

export const addToCart = async (req, res) => {
  try {
    let userData = await userModal.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModal.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: " Added to cart " });
  } catch (error) {
    res.json({ success: false, message: " error in adding to cart " });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    let userData = await userModal.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1;
    }
    await userModal.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: " removed from cart " });
  } catch (error) {
    res.json({ success: false, message: "error in removed from cart " });
  }
};
export const getCart = async (req, res) => {
  try {
    let userData = await userModal.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: "error in getting cart " });
  }
};
