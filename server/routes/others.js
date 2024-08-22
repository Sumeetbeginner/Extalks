
import express from 'express'
import { getAllNotification, sendReport, userDetailsUpvote } from '../controllers/others.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/sendreport', verifyToken, sendReport)
router.post('/getupvotesdetails', verifyToken, userDetailsUpvote)
router.get('/getallnotification', verifyToken, getAllNotification)

export default router