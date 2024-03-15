import { Request, Response } from "express";
import mongoose from 'mongoose'
import Offer from "../models/offers";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const createOffer = async (req: Request, res: Response) => {
    interface IOffer {
        tradesmanId: mongoose.Types.ObjectId;
        userId: mongoose.Types.ObjectId;
        price: number;
        caseId: mongoose.Types.ObjectId;
        timeComing: Date;
        accepted: boolean;
    }

    try{
        
    }catch(e){
        
    }
}
