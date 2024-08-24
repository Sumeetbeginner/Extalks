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

//Follow & Unfollow User - NOTIFICATION (When User follows)
export const funfuser = async (req, res) => {
  try {
    const userId = req.user.id; // Current logged-in user (user1)
    const { user2_id } = req.body; // User to be followed/unfollowed (user2)

    const user1 = await User.findById(userId);
    const user2 = await User.findById(user2_id);

    if (!user1 || !user2) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user2_id exists in user1's following array
    const isFollowing = user1.following.includes(user2_id);

    if (isFollowing) {
      // Unfollow User

      // Remove user2 from following array of user1
      await User.findByIdAndUpdate(
        userId,
        { $pull: { following: user2_id } },
        { new: true }
      );

      // Remove user1 from followers array of user2
      await User.findByIdAndUpdate(
        user2_id,
        { $pull: { followers: userId } },
        { new: true }
      );

      return res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow User

      // Add user2 to following array of user1
      await User.findByIdAndUpdate(
        userId, 
        { $addToSet: { following: user2_id } },
        { new: true }
      );

      // Add user1 to followers array of user2
      await User.findByIdAndUpdate(
        user2_id,
        { $addToSet: { followers: userId } },
        { new: true }
      );

      const user1U = await User.findById(userId)

      //Notification
      const newN = {
        action: "followed you",
        user2_id: userId,
        objType: "User",
        objId: userId,
        username2: user1U.username,
        seen: false,
      };

      const notUser = await User.findById(user2_id);

      if (!notUser) {
        return res.status(404).json({ error: "User not found" });
      }

      if (notUser.notification.length < 10) {
        notUser.notification.push(newN);
      } else {
        notUser.notification.shift();
        notUser.notification.push(newN);
      }

      await notUser.save();

      return res.status(200).json({ message: "User followed successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Profile View
export const profileView = async (req, res) => {
  try {
    const userId = req.user.id;
    const user2_id = req.params.user2_id;

    const user2 = await User.findById(user2_id);

    if (!user2) {
      return res.status(404).json({ error: "User not found" });
    }

    //User Found

    if (user2.profileViews.length < 10) {
      await User.findByIdAndUpdate(
        user2_id,
        { $push: { profileViews: userId } },
        { new: true }
      );
    } else {
      user2.profileViews.shift();
      user2.profileViews.push(currentUserId);
      await user2.save();
    }

    const user2Object = user2.toObject();
    delete user2Object.password;

    res.status(200).json(user2Object);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Get Authenticated User
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id; 

    const user = await User.findById(userId).select('-password'); 

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};