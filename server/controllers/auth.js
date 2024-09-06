import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
      categories,
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
      categories,
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // res.cookie("jwt", token, {
    //   httpOnly: true, // Prevents JavaScript from accessing the token
    //   secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS in production
    //   sameSite: "Strict", // Prevents CSRF attacks by restricting cross-site requests
    //   maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    // });

    delete user.password;
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// LOGOUT USER
export const logout = async (req, res) => {
  // res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

// CHECK AUTH
export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "User Not Authenticated" });
    }

    //Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Fetch User from Database
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }

    res.status(200).json({ user, token });
  } catch (err) {
    res
      .status(401)
      .json({ message: "Authentication failed", error: err.message });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
  },
});

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const resetToken = Math.random().toString(36).substring(2, 15);

    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 3600000; // 1 hour expiration

    await user.save();

    // Send email with reset link
    const resetLink = `http://localhost:5173/resetpassword/${resetToken}`;
    const emailSent = await sendEmail(
      user.email,
      "Password Reset Link",
      resetLink
    );

    if (emailSent) {
      res.status(200).json({ message: "Password reset link sent!" });
    } else {
      console.error("Error sending email");
      res.status(500).json({ message: "Error sending password reset link." });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Helper function for sending email
const sendEmail = async (recipientEmail, subject, text) => {
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #3a3fc5;">Password Reset Request</h2>
    <p>Hi,</p>
    <p>We received a request to reset your password for your <strong>Extalks</strong> account.</p>
    <p>Please click the button below to reset your password:</p>
    <a href="${text}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: #fff; background-color: #3a3fc5; text-decoration: none; border-radius: 5px;">Reset Password</a>
    <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
    <br>
    <p>Thanks,</p>
    <p>The <strong>Extalks</strong> Team</p>
  </div>
`;

const mailOptions = {
  from: process.env.EMAIL_ID,
  to: recipientEmail,
  subject: subject,
  html: htmlContent,
};

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { token: resetToken } = req.params;
    const {  password } = req.body;

    const user = await User.findOne({ resetToken, resetTokenExpire: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token!" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};