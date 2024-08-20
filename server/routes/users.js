
import express from 'express'
import { editProfileInfo, funfuser, profileView } from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/editprofileinfo', verifyToken, editProfileInfo)
router.post('/funfuser', verifyToken, funfuser)
router.get('/profile/:user2_id', verifyToken, profileView)

export default router