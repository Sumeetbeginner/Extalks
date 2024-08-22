import User from "../models/User.js";
import Answer from "../models/Answer.js";
import Comment from "../models/Comment.js";

//Create comment of particular answer + NOTIFICATION
export const commentAns = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commDesc, commAns } = req.body;

    // Find the user making the comment
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Commenting user not found" });
    }

    const newComment = new Comment({
      commUser: userId,
      commDesc,
      commUpV: [],
      commAns,
    });

    const savedComm = await newComment.save();

    await Answer.findByIdAndUpdate(
      commAns,
      { $addToSet: { comments: savedComm._id } },
      { new: true }
    );

    const answer = await Answer.findById(commAns);
    const notUser = await User.findById(answer.ansUser);

    // Notification
    const newN = {
      action: `commented '${commDesc}' on your answer`,
      user2_id: userId,
      objType: "Answer",
      objId: commAns,
      username2: user.username,
      seen: false,
    };

    if (!notUser) {
      return res.status(404).json({ error: "User to notify not found" });
    }

    if (notUser.notification.length < 10) {
      notUser.notification.push(newN);
    } else {
      notUser.notification.shift();
      notUser.notification.push(newN);
    }

    await notUser.save();

    res.status(201).json({
      message: "Comment submitted successfully",
      comment: savedComm,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Find Comments With Answer ID
export const getAllCommentsAns = async (req, res) => {
  try {
    const { answerId } = req.body;

    const answer = await Answer.findById(answerId).populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "commUser",
        model: "User",
        select: "-password",
      },
    });

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    res.status(200).json({
      comments: answer.comments,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Upvote and Remove Upvote Comment NOTIFICATION(when someone upvotes)
export const upvoteComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.body;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const isUpvoted = comment.commUpV.includes(userId);

    if (isUpvoted) {
      // Remove Upvote
      await Comment.findByIdAndUpdate(
        commentId,
        { $pull: { commUpV: userId } },
        { new: true }
      );
      return res.status(200).json({ message: "Upvote removed successfully" });
    } else {
      // Add Upvote
      await Comment.findByIdAndUpdate(
        commentId,
        { $addToSet: { commUpV: userId } },
        { new: true }
      );

      const upvotedUser = await User.findById(userId);

      // Notification
      const newN = {
        action: `upvoted your comment`,
        user2_id: userId,
        objType: "Answer",
        objId: comment.commAns,
        username2: upvotedUser.username,
        seen: false,
      };

      const notUser = await User.findById(comment.commUser);

      if (!notUser) {
        return res.status(404).json({ error: "User to notify not found" });
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
