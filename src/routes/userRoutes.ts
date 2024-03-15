import express, { Request, Response } from 'express';
import {userRegister, userSignIn, userEdit} from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', userRegister);
router.get('/login', userSignIn);
router.put('/edit', verifyToken, userEdit)

export default router;

