import User from "../models/User.js";
import Question from "../models/Question.js";

//Ask Question
export const askQuestion = async (req, res) => {
  try {
    const userId = req.user.id;

    const { questDesc, questImg } = req.body;

    const newQuestion = new Question({
      questDesc,
      questImg,
      questAns : [],
      questFollC : [],
      questUser: userId,
    });

    const savedQuestion = await newQuestion.save();

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { questAsk: savedQuestion._id } },
      { new: true }
    );

    res
      .status(201)
      .json({
        message: "Question created successfully",
        question: savedQuestion,
      });


  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Follow Question
export const followQuestion = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//View Question
export const viewQuestion = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
