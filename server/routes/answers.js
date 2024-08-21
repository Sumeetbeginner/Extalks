
import express from 'express'
import { ansQuestion, upvoteAns, downvoteAns, viewAns } from '../controllers/answers.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/ansquestion', verifyToken, ansQuestion)
router.post('/upvoteanswer', verifyToken, upvoteAns)
router.post('/downvoteanswer', verifyToken, downvoteAns)
router.get('/:answer_id', verifyToken, viewAns)

export default router