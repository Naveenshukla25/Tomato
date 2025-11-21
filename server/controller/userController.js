import userModal from "../modal/userModal.js";
import jwt from "jsonwebtoken";
import validators from "validator";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: " User not found " });
    }
    if (user.password !== password) {
      return res.json({ success: false, message: " Invalid credentials " });
    }
    const token = createtoken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: " Error " });
  }
};

const createtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  console.log(req.body);
  try {
    const exist = await userModal.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "user Already exist" });
    }
    // validating
    if (!validators.isEmail(email)) {
      return res.json({
        success: false,
        message: " Please enter  a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: " please enter strong password ",
      });
    }
    const newUser = new userModal({
      name: name,
      email: email,
      password: password,
    });
    const user = await newUser.save();
    const token = createtoken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: " Error " });
  }
};

export { loginUser, registerUser };
