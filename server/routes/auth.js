import express from 'express';
import { login, register, logout } from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', verifyToken, register);

export default router;
