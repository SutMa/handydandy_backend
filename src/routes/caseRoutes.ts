import express, { Request, Response } from 'express';
import { makeNewCase } from '../controllers/casesController';
import { verifyUserToken } from '../middleware/authUser';
import multer from 'multer';
const router = express.Router()
const upload = multer({storage: multer.memoryStorage()})

router.post('/create', verifyUserToken, upload.any(), makeNewCase)



export default router
