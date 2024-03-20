import { NextFunction, Request, Response } from "express";
import mongoose from 'mongoose';
import {Types} from 'mongoose'
import Offer from "../models/offers";
import Case from '../models/cases';
import Tradesman from "../models/tradesman";
import { timeValidation } from "../helpers/timeValidation";

const makeOffer = async (req: Request, res: Response) => {
    try {
        const tradesmanId = req.user?.ID;
        if (!tradesmanId) {
            return res.status(401).json({ error: "Did not find tradesmanId" });
        }

        const caseId = req.body.caseId;
        if (!caseId) {
            return res.status(401).json({ error: "No caseId" });
        }

        const caseForOffer = await Case.findById(caseId);
        if (!caseForOffer) {
            return res.status(401).json({ error: "Case not found" });
        }

        const tradesman = await Tradesman.findById(tradesmanId);
        if (!tradesman) {
            return res.status(401).json({ error: "Tradesman not found" });
        }

        
        const timeComing = req.body.timeComing
        if(!timeComing){
            return res.status(401).json({ error: "Time coming field is not found"})
        }
       
       if(!timeValidation(timeComing, caseForOffer.timeAvailable)){
            return res.status(401).json({error: "Time is not valid for this case"})
       }

        
        const newOffer = new Offer({
            tradesmanId: tradesman._id,
            userId: caseForOffer.userId,
            price: req.body.price,
            timeComing: timeComing, 
            caseId: caseForOffer._id,
            summary: req.body.summary,
        });
        
        await newOffer.save()
        tradesman.offersPlaced.push()

        return res.status(201).json(newOffer);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



const deleteOffer = async (req: Request, res: Response) => {

    

    
}

export { makeOffer };
