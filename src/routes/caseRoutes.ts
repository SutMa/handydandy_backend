import express, { Request, Response } from 'express';
import { makeNewCase } from '../controllers/casesController';
import { verifyUserToken } from '../middleware/authUser';
const router = express.Router()

router.post('/create', verifyUserToken, makeNewCase)

export default router
