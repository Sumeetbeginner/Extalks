import User from "../models/User.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

//Answer Question
export const ansQuestion = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ansDesc, ansPic, ansQuest } = req.body;

    const newAns = new Answer({
      ansDesc,
      ansPic,
      ansUpV: [],
      ansDownV: [],
      comments: [],
      ansQuest,
      ansUser: userId,
    });

    const savedAns = await newAns.save();

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { questAns: savedAns._id } },
      { new: true }
    );

    await Question.findByIdAndUpdate(
      ansQuest,
      { $addToSet: { questAns: savedAns._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Answer submitted successfully",
      answer: savedAns,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Upvote Answer
export const upvoteAns = async (req, res) => {};
//Downvote Answer
export const downvoteAns = async (req, res) => {};
//View Answer
export const viewAns = async (req, res) => {};
