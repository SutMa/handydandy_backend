import express, { Request, Response } from 'express';
import { verifyTradesmanToken } from '../middleware/authTradesman';
import { getOffers, makeOffer, seeOffers } from '../controllers/offerController';
import { verifyUserToken } from '../middleware/authUser';
const router = express.Router();

//tradesman routes
router.post("/create", verifyTradesmanToken, makeOffer)
router.get("/get", verifyTradesmanToken, getOffers)


//user routes
router.get('/see', verifyUserToken, seeOffers)


export default router
