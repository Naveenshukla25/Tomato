import orderModal from "../modal/orderModal.js";
import userModal from "../modal/userModal.js";
import foodModal from "../modal/foodModal.js";

// Placing user order for frontend
export const placeorder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    // Verify stock availability
    const itemIds = items.map((item) => item._id);
    const dbFoods = await foodModal.find({ _id: { $in: itemIds } });
    const outOfStockItems = dbFoods.filter((f) => f.inStock === false);

    if (outOfStockItems.length > 0) {
      const names = outOfStockItems.map((f) => f.name).join(", ");
      return res.json({
        success: false,
        message: `Sorry, the following item(s) are currently out of stock: ${names}. Please remove them from your cart to proceed.`,
      });
    }

    const newOrder = new orderModal({
      userId,
      items,
      amount,
      address,
      status: "Food Processing",
      date: new Date(),
      payment: false,
    });

    await newOrder.save();

    // Clear user's cartData in database
    await userModal.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in placing order" });
  }
};

// User orders for frontend (customer order history) - strictly returns orders for the authenticated user
export const userOrders = async (req, res) => {
  try {
    const userId = req.body?.userId || req.userId;
    if (!userId) {
      return res.json({ success: false, message: "User not authenticated", data: [] });
    }

    // Query for orders matching this user ID (supporting both string and ObjectId representations)
    const query = {
      $or: [
        { userId: userId.toString() },
        { userId: userId }
      ]
    };

    const orders = await orderModal.find(query).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in getting user orders", data: [] });
  }
};

// Listing all orders for admin panel
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModal.find({}).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in getting orders", data: [] });
  }
};

// Updating order status (from admin panel)
export const updateStatus = async (req, res) => {
  try {
    const orderId = req.body.orderId || req.body.id;
    const { status } = req.body;
    if (!orderId) {
      return res.json({ success: false, message: "Order ID is required" });
    }
    const updatedOrder = await orderModal.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.json({ success: false, message: "Order not found" });
    }
    console.log(`Order ${orderId} status updated to: ${status}`);
    res.json({
      success: true,
      message: `Status updated to ${status}`,
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

// Map userorder to userOrders so customer endpoints NEVER expose other users' orders
export const userorder = userOrders;
