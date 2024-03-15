import express, { Request, Response } from 'express';
import {userRegister, userSignIn, userEdit} from '../controllers/userController.js';
import { verifyUserToken } from '../middleware/authUser.js';
const router = express.Router();

router.post('/register', userRegister);
router.get('/login', userSignIn);
router.put('/edit', verifyUserToken, userEdit)

export default router;

