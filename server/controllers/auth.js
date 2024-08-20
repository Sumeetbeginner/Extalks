import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
export const register = async (req, res) => {
  try {
    const {
      username,
      name,
      profilePic,
      qualification,
      profession,
      gender,
      country,
      email,
      password,
      categories
    } = req.body;

    // Check if user with same email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Check if user with same username exists
    const existingUN = await User.findOne({ username });
    if (existingUN) {
      return res
        .status(400)
        .json({ error: "User with this username already exists" });
    }

    // Hashing using salt
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      name,
      profilePic,
      qualification,
      profession,
      gender,
      country,
      email,
      password: passwordHash,
      categories
    });

    // Save user data in mongoDB
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email already exists in database
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ mess: "user doesnt exist!" });
    }

    // Comparing password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ mess: "Incorrect Password!" });

    // JSON WEB TOKEN SETUP
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
