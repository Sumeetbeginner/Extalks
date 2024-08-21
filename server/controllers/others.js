import Report from "../models/Report.js";
import User from "../models/User.js";
import Answer from "../models/Answer.js";

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
