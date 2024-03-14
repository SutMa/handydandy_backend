import express from 'express'
import {tradesmanRegister, tradesmanSignIn} from '../controllers/tradesmanController'
const router = express.Router();

router.post('/register', tradesmanRegister)
router.get('/login', tradesmanSignIn)

export default router;
