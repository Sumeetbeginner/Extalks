import User from "../models/User.js";

// Edit Profile Info
export const editProfileInfo = async (req, res) => {
  try {
    const userId = req.user.id; 

    const {
      username,
      name,
      profilePic,
      qualification,
      profession,
      gender,
      country,
      categories,
      bio,
    } = req.body;

    // Check if the new username is already taken by another user
    if (username) {
      const existingUN = await User.findOne({ username });
      if (existingUN && existingUN._id.toString() !== userId) {
        return res.status(400).json({ error: "Username already exists" });
      }
    }

    // Update the user with the new data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username,
          name,
          profilePic,
          qualification,
          profession,
          gender,
          country,
          categories,
          bio,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
