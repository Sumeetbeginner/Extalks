import express from "express";
import {
  commentAns,
  getAllCommentsAns,
  upvoteComment,
} from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/commentans", verifyToken, commentAns);
router.post("/upvotecomment", verifyToken, upvoteComment);
router.post("/getallcomments", verifyToken, getAllCommentsAns);

export default router;
