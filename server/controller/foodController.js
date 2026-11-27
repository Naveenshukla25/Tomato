import foodModal from "../modal/foodModal.js";

//add food
const addFood = async (req, res) => {
  const food = new foodModal({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    inStock: req.body.inStock !== undefined ? Boolean(req.body.inStock) : true,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added", data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModal.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const removeFood = async (req, res) => {
  try {
    // No need to delete file since image is stored on Cloudinary
    await foodModal.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: " food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

// Update stock status (In Stock / Out of Stock)
const updateStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const food = await foodModal.findByIdAndUpdate(
      id,
      { inStock: Boolean(inStock) },
      { new: true }
    );
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }
    res.json({
      success: true,
      message: `Item marked as ${food.inStock ? "In Stock" : "Out of Stock"}`,
      data: food,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating stock status" });
  }
};

export { addFood, listFood, removeFood, updateStock };
