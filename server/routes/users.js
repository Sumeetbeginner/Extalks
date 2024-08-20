
import express from 'express'
import { editProfileInfo } from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/editprofileinfo', verifyToken, editProfileInfo)

export default router