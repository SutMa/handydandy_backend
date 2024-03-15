import { Request, Response } from "express";
import mongoose from 'mongoose'
import Tradesman from '../models/tradesman'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

interface tradesmanInfo {
    password: string;
    email: string;
    name: string;
    tradeOccupation: string;
    summary: string;
    averagePriceRange: number;
    serviceArea: number[];
    profileCompleted: boolean;
    casesInvolved: mongoose.Schema.Types.ObjectId[];
    offersPlaced: mongoose.Schema.Types.ObjectId[];
}


const tradesmanRegister = async (req: Request, res: Response) => {
    try{
        const {password} = req.body
        delete req.body.password
        const hashedPassword = await bcrypt.hash(password, 10)
        req.body.password = hashedPassword
        const newTradesman: tradesmanInfo = await Tradesman.create(req.body)
        res.status(200).json({message: "Tradesman Registrataion Success"})
    }catch(e){
        console.log(e)
        res.status(400).json({message: "Tradesman registration failed"})
    }
} 

const tradesmanSignIn = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body
        const tradesman = await Tradesman.findOne({email})
        if (!tradesman){
            return res.status(401).json({error: "Authentication failed"})
        }
        const matchedPassword = await bcrypt.compare(password, tradesman.password)
        if (!matchedPassword){
            return res.status(401).json({error: "Authentication failed"})
        }
        const token = jwt.sign({tradesmanId: tradesman._id}, "my-secret-key", {expiresIn: '360h'})
        res.status(200).json({token})
    }catch(e){
        res.status(500).json({error: "Login Failed"})
    }
}


export {tradesmanSignIn, tradesmanRegister}

