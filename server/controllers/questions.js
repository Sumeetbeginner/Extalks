import User from "../models/User.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

//Ask Question
export const askQuestion = async (req, res) => {
  try {
    const userId = req.user.id;

    const { questDesc, questImg } = req.body;

    const newQuestion = new Question({
      questDesc,
      questImg,
      questAns: [],
      questFollC: [],
      questUser: userId,
    });

    const savedQuestion = await newQuestion.save();

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { questAsk: savedQuestion._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Question created successfully",
      question: savedQuestion,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Follow & Unfollow Question Question
export const followQuestion = async (req, res) => {
  try {
    const userId = req.user.id; // Current logged-in user (user1)
    const { questionId } = req.body; // Question to be followed/unfollowed

    // Find the user and question by their respective IDs
    const user1 = await User.findById(userId);
    const question1 = await Question.findById(questionId);

    if (!user1) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!question1) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Check if userId exists in the question's follow array (questFollC)
    const isFollowing = question1.questFollC.includes(userId);

    if (isFollowing) {
      // Unfollow Question

      // Remove userId from questFollC array of the question
      await Question.findByIdAndUpdate(
        questionId,
        { $pull: { questFollC: userId } },
        { new: true }
      );

      // Remove questionId from questFoll array of the user
      await User.findByIdAndUpdate(
        userId,
        { $pull: { questFoll: questionId } },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Question unfollowed successfully" });
    } else {
      // Follow Question

      // Add userId to questFollC array of the question
      await Question.findByIdAndUpdate(
        questionId,
        { $addToSet: { questFollC: userId } },
        { new: true }
      );

      // Add questionId to questFoll array of the user
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { questFoll: questionId } },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Question followed successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//View Question

export const viewQuestion = async (req, res) => {
  try {
    const { question_id } = req.params;

    // Fetch question details by ID
    const question = await Question.findById(question_id)
      .populate({
        path: "questAns", // Populate questAns with answer details
        model: "Answer",
        populate: {
          path: "ansUser", // Populate the user who answered this
          model: "User",
          select: "-password", // Exclude password from the user details
        },
      })
      .populate({
        path: "questUser", // Populate the user who asked this question
        model: "User",
        select: "-password", // Exclude password from the user details
      })
      .populate({
        path: "questFollC", // Populate the array of users who followed the question
        model: "User",
        select: "-password", // Exclude password from the user details
      });

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Return all necessary data
    return res.status(200).json({
      question,
      answers: question.questAns,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
