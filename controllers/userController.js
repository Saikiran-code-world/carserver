const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config(); 
const bcrypt = require("bcrypt");

const SECKEY = process.env.SECKEY;
// console.log(SECKEY)//checking the sec key

// user registartion
const userRegister = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newUser.save();

    const token = jwt.sign({ userid: user._id }, SECKEY, { expiresIn: "1d" });
    const options = {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    };
    return res
      .status(200)
      .cookie("token", token, options)
      .json({ message: "user registered sucessfully", token });
  } catch (error) {
    console.log("Error in user Login controller:", error);
    res.status(500).json({ error: "internal server err" });
  }
};

// user login with jwt

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign({ userid: user._id }, SECKEY, { expiresIn: "1d" });
    const options = {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "User Logged In",
      token,
    });
  } catch (error) {
    console.log("Error in user Login controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const userLogout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({
      success: true,
      message: "User LoggodOut Successfully",
    });
  } catch (error) {
    console.log("Error in user Logout controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { userRegister, userLogin, userLogout };
