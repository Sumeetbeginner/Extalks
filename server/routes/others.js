
import express from 'express'
import { getAllNotification, sendReport, userDetailsUpvote, feedPosts } from '../controllers/others.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/sendreport', verifyToken, sendReport)
router.post('/getupvotesdetails', verifyToken, userDetailsUpvote)
router.get('/feed', verifyToken, feedPosts)

export default router