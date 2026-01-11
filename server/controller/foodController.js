import foodModal from "../modal/foodModal.js";

//add food
const addFood = async (req, res) => {
  const food = new foodModal({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
  });

  try {
    await food.save();
    res.json({ success: true, message: "food Added " });
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

export { addFood, listFood, removeFood };
