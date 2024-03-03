import express, { Request, Response } from 'express';
import {userRegister} from '../controllers/userRegisterLogin.js';
const router = express.Router();

router.post('/register', userRegister);

router.get('/login', (req: Request, res: Response) => {
  
});


export default router;

