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

    // Check if email exists in the database
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ mess: "User doesn't exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ mess: "Incorrect Password!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('jwt', token, {
      httpOnly: true, // Prevents JavaScript from accessing the token
      secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
      sameSite: 'Strict', // Prevents CSRF attacks by restricting cross-site requests
      maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
    });

    delete user.password;
    res.status(200).json({ user });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// LOGOUT USER
export const logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};
