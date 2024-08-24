
import express from 'express'
import { editProfileInfo, funfuser, getCurrentUser, profileView } from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/editprofileinfo', verifyToken, editProfileInfo)
router.post('/funfuser', verifyToken, funfuser)
router.get('/profile/:user2_id', verifyToken, profileView)
router.get('/current', verifyToken, getCurrentUser)

export default router