import express, { Request, Response } from 'express';
import {userRegister, userSignIn} from '../controllers/userController.js';
const router = express.Router();

router.post('/register', userRegister);

router.get('/login', userSignIn);


export default router;

