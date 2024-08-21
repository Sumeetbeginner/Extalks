
import express from 'express'
import { sendReport, userDetailsUpvote } from '../controllers/others.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/sendreport', verifyToken, sendReport)
router.post('/getupvotesdetails', verifyToken, userDetailsUpvote)

export default router