import express, { Request, Response } from 'express';
import { verifyTradesmanToken } from '../middleware/authTradesman';
import { makeOffer } from '../controllers/offerController';
const router = express.Router();

router.post("/create", verifyTradesmanToken, makeOffer)

export default router
