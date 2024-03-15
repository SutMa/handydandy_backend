import {Request, Response} from 'express'
import mongoose from 'mongoose'
import User from '../models/users'
import Case from '../models/cases'
import Tradesman from '../models/tradesman'
import { verifyUserToken } from '../middleware/authUser'

interface caseInfo {
    status: string;
    timeAvialible: Date[];
    timeComing: Date;
    address: string;
    chatId: mongoose.Types.ObjectId;
    tradesmanId: mongoose.Types.ObjectId;
}



const makeNewCase = async (req: Request, res: Response) => {
    if (!req.user){
        return res.status(401).send("User not authenticated")
    }

    try{
        const user = await User.findById(req.user.ID)

        if (!user){
            return res.status(404).send("User not found")
        }

        const userId = req.user.ID
        req.body.userId = userId

        if (user.zipcode){
            req.body.zipcode = user.zipcode
        }
        const newCase: caseInfo = await Case.create(req.body)
        return res.status(200).json({success: "Case created"})

    }catch(e){
        return res.status(500).json({error: "Case creation error"})
    }

}

const updateCase = async (req: Request, res: Response) => {

}

const deleteCase = async (req: Request, res: Response) => {

}



export {makeNewCase}
