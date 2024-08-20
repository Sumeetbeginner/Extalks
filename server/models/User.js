import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    profilePic: {
      type: String,
      default:"null"
    },
    qualification: {
      type: String,
    },
    profession: {
      type: String,
      required: true,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    bio: {
      type: String,
      min: 5,
      default : ""
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    questAsk: {
      //Array of ID of Questions Asked by User
      type: Array,
      default: [],
    },
    questAns: {
      //Array of ID of Questions Answered by User
      type: Array,
      default: [],
    },
    profileViews: {
      // Array of latest 10 User ID viewed profile of current user
      type: Array,
      default: [],
    },
    notification: {
      // Only latest 10 Notifications {notificationType : upvotes/comment/follow, notificationMess, id : upvotedPost/commentedPost/ FollowedUserId, notificationTime }
      type: Array,
      default: [],
    },
    questFoll: {
      //Array of ID of Questions Followed by User
      type: Array,
      default: [],
    },
    categories:{
      type:Array,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
