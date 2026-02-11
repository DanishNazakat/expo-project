const User = require("../models/User");
const bcrypt = require("bcrypt");

async function signup(req, res) {
  try {
    const { name, phone, email, password } = req.body;

    // validation
    if (!name || !phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // hash password
    const saltRounds = 10; // standard
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create user
    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword, // hashed password
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully 🚀",
      data: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}



async function login(req, res) {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // login success
    res.status(200).json({
      success: true,
      message: "Login successful 🎉",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role || null 
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }

}






module.exports = {signup , login};
