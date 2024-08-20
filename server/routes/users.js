
import express from 'express'
import { editProfileInfo, funfuser } from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/editprofileinfo', verifyToken, editProfileInfo)
router.post('/funfuser', verifyToken, funfuser)

export default router