import User from "../models/User.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

//Answer Question + NOTIFICATION
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

    const userbhai = await User.findById(userId)
    const questUser = await Question.findById(ansQuest)

     //Notification
     const newN = {
      action: "answered your question",
      user2_id: userId,
      objType: "Answer",
      objId: savedAns._id,
      username2: userbhai.username,
      seen: false,
    };

    const notUser = await User.findById(questUser.questUser);

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


    res.status(201).json({
      message: "Answer submitted successfully",
      answer: savedAns,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Upvote or Remove Upvote for an Answer + NOTIFICATION(when someone upvotes)
export const upvoteAns = async (req, res) => {
  try {
    const userId = req.user.id;
    const { answerId } = req.body;

    // Fetch the user and answer
    const user = await User.findById(userId);
    const answer = await Answer.findById(answerId);

    // Check if the user and answer exist
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Check if the user has already upvoted the answer
    const isUpvoted = answer.ansUpV.includes(userId);

    if (isUpvoted) {
      // Remove Upvote
      await Answer.findByIdAndUpdate(
        answerId,
        { $pull: { ansUpV: userId } },
        { new: true }
      );
      return res.status(200).json({ message: "Upvote removed successfully" });
    } else {
      // Add Upvote

      if (answer.ansDownV.includes(userId)) {
        await Answer.findByIdAndUpdate(
          answerId,
          { $pull: { ansDownV: userId } },
          { new: true }
        );
      }

      await Answer.findByIdAndUpdate(
        answerId,
        { $addToSet: { ansUpV: userId } },
        { new: true }
      );

      //Notification
      const newN = {
        action: "upvoted your answer",
        user2_id: userId,
        objType: "Answer",
        objId: answerId,
        username2: user.username,
        seen: false,
      };

      const notUser = await User.findById(answer.ansUser);

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

      return res.status(200).json({ message: "Upvoted successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Downvote Answer
export const downvoteAns = async (req, res) => {
  try {
    const userId = req.user.id;
    const { answerId } = req.body;

    // Fetch the user and answer
    const user = await User.findById(userId);
    const answer = await Answer.findById(answerId);

    // Check if the user and answer exist
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Check if the user has already downvoted the answer
    const isDownvoted = answer.ansDownV.includes(userId);

    if (isDownvoted) {
      // Remove Downvote
      await Answer.findByIdAndUpdate(
        answerId,
        { $pull: { ansDownV: userId } },
        { new: true }
      );
      return res.status(200).json({ message: "Downvote removed successfully" });
    } else {
      // Add Downvote
      if (answer.ansUpV.includes(userId)) {
        await Answer.findByIdAndUpdate(
          answerId,
          { $pull: { ansUpV: userId } },
          { new: true }
        );
      }
      await Answer.findByIdAndUpdate(
        answerId,
        { $addToSet: { ansDownV: userId } },
        { new: true }
      );
      return res.status(200).json({ message: "Downvoted successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//View Answer
export const viewAns = async (req, res) => {
  try {
    const userId = req.user.id;
    const { answer_id } = req.params;

    const answer = await Answer.findById(answer_id).populate({
      path: "ansUser",
      model: "User",
      select: "-password",
    });

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    const isUpvoted = answer.ansUpV.includes(userId);
    const isDownvoted = answer.ansDownV.includes(userId);

    return res.status(200).json({
      answer: {
        ...answer._doc,
        isUpvoted,
        isDownvoted,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
