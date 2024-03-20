import express, { Request, Response } from 'express';
import { getCases, makeNewCase } from '../controllers/casesController';
import { verifyUserToken } from '../middleware/authUser';
import multer from 'multer';
const router = express.Router()
const upload = multer({storage: multer.memoryStorage()})

router.post('/create', verifyUserToken, upload.any(), makeNewCase)
router.get('/get', verifyUserToken, getCases)


export default router
