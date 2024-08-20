
import express from 'express'
import { askQuestion, followQuestion, viewQuestion } from '../controllers/questions.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/askquestion', verifyToken, askQuestion)
router.post('/followquestion', verifyToken, followQuestion)
router.get('/:question_id', verifyToken, viewQuestion)

export default router