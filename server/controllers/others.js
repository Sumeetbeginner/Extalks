import Report from "../models/Report.js";
import User from "../models/User.js";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";

//Send Report API
export const sendReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const { repType, repDesc, repCat, repId } = req.body;

    const newRep = new Report({
      repUser: userId,
      repDesc,
      repType,
      repCat,
      repId,
    });

    const savedRep = await newRep.save();

    res.status(201).json({
      message: "Report submitted successfully",
      report: savedRep,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Get All user details who upvoted the answer
export const userDetailsUpvote = async (req, res) => {
  try {
    const { answerId } = req.body;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    const upvotersIds = answer.ansUpV;

    if (upvotersIds.length === 0) {
      return res.status(200).json({ users: [] }); // No upvoters
    }

    const upvoters = await User.find({ _id: { $in: upvotersIds } }).select(
      "-password"
    );

    return res.status(200).json({
      users: upvoters,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// API to retrieve notification and after send it to frontend and update all seen : true
export const getAllNotification = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const notifications = user.notification;

    user.notification = user.notification.map((n) => ({ ...n, seen: true }));

    await user.save();

    return res.status(200).json({ notifications });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
// API to get Posts Feed
export const feedPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 3;
    const sortMethod = req.query.sort || "relevance";

    const skip = (page - 1) * limit;

    let sortCriteria;
    switch (sortMethod) {
      case "relevance":
        sortCriteria = { ansUpV: -1 }; // Sort by most upvoted (relevance)
        break;
      case "oldest":
        sortCriteria = { createdAt: 1 }; // Sort by oldest first
        break;
      case "newest":
        sortCriteria = { createdAt: -1 }; // Sort by newest first
        break;
      case "mostLiked":
        sortCriteria = { ansUpV: -1 }; // Sort by most liked (upvotes)
        break;
      default:
        sortCriteria = { createdAt: -1 }; // Default to newest first
        break;
    }

    let answers = await Answer.find()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "ansUser",
        model: "User",
        select: "username profilePic profession",
      })
      .populate({
        path: "ansQuest",
        model: "Question",
        select: "questDesc"
      });

    res.status(200).json(answers);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
