import express, { Request, Response } from 'express';
import { acceptOffer, getCases, makeNewCase } from '../controllers/casesController';
import { verifyUserToken } from '../middleware/authUser';
import multer from 'multer';
import { verifyTradesmanToken } from '../middleware/authTradesman';
import { seeCases } from '../controllers/casesController';
const router = express.Router()
const upload = multer({storage: multer.memoryStorage()})

//user routes
router.post('/create', verifyUserToken, upload.any(), makeNewCase)
router.get('/get', verifyUserToken, getCases)
router.get('/accept',verifyUserToken, acceptOffer)

//tradesman routes
router.get('/see', verifyTradesmanToken, seeCases)
export default router
