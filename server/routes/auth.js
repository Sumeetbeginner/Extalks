import express from 'express';
import { login, register, logout, checkAuth } from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', verifyToken, logout);
router.get("/checkauth", checkAuth); 

export default router;
