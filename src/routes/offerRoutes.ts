import express, { Request, Response } from 'express';
import { verifyTradesmanToken } from '../middleware/authTradesman';
import { getOffers, makeOffer } from '../controllers/offerController';
const router = express.Router();

router.post("/create", verifyTradesmanToken, makeOffer)
router.get("/get", verifyTradesmanToken, getOffers)
export default router
