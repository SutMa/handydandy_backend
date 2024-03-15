import express, { Request, Response } from 'express';
import { makeNewCase } from '../controllers/casesController';
import { verifyToken } from '../middleware/authMiddleware';
const router = express.Router()

router.post('/create', verifyToken, makeNewCase)

export default router
