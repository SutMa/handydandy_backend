import express from 'express'
import { verifyTradesmanToken } from '../middleware/authTradesman';
import {tradesmanRegister, tradesmanSignIn, tradesmanEdit} from '../controllers/tradesmanController'

const router = express.Router();

router.post('/register', tradesmanRegister)
router.get('/login', tradesmanSignIn)
router.put('/edit', verifyTradesmanToken, tradesmanEdit)

export default router;
