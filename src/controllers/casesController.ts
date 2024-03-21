import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/users';
import Case from '../models/cases';
import Offer from '../models/offers'
import { uploadImageToBucket } from '../services/googleCloudStorage';
import Tradesman from '../models/tradesman'


require('dotenv').config();

//user makes a case
const makeNewCase = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.ID;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized user" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const summary = req.body.summary;
        
        if (!summary) {
            console.log(summary)
            return res.status(400).json({ message: "Summary is required" });
        }

        const timeAvailable = JSON.parse(req.body.timeAvailable);

        if (!timeAvailable) {
            return res.status(400).json({ message: "Time available is required" });
        }

        const newCase = new Case({
            userId: userId,
            timeAvailable: timeAvailable,
            summary: summary,
            address: user.address,
            zipcode: user.zipcode,
            caseType: req.body.caseType,
        });

        await newCase.save();

        if (req.files && Array.isArray(req.files) && req.files.length<=10) {
            const bucketName = process.env.BUCKET_NAME as string;
            const files = req.files as Express.Multer.File[];

            const imageUrls = await Promise.all(files.map(file =>
                uploadImageToBucket(file, newCase._id.toString(), bucketName)
            ));

            newCase.images = imageUrls;
            await newCase.save();
        }

        await User.updateOne(
            {_id: userId},
            {$push: {cases: newCase._id}}
        )

        return res.status(201).json({newCase});
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//user get the cases they posted
const getCases = async (req: Request, res: Response) => {
    try{
        const userId = req.user?.ID;
        if (!userId) {
            return res.status(400).json({error: "User ID not found"})
        }
        const user = await User.findById(userId).exec()
        if(!user) {
            return res.status(400).json({error: "User not found"})
        }
    
        const casesToFind = await user.cases
        const cases = await Case.find({_id: {$in: casesToFind}}).exec()
        return res.status(200).json(cases)
    }catch(e){
        console.log(e)
        return res.status(500).json({error: "Internal server error"})
    }
}

//user accepts an offer based on offerId
const acceptOffer  = async (req: Request, res: Response) => {
    try{
        const userId = req.user?.ID
        const offerId = req.body.offerId
        if (!offerId){
            return res.status(404).json({error: "offerId not found"})
        }
        const offer = await Offer.findById(offerId)
        if (!offer){
            return res.status(404).json({error: "Offer nor found"})
        }
        const caseId = offer?.caseId
        if (!caseId){
            return res.status(404).json({error: "Case does not exist"})
        }
        const caseToUpdate = await Case.findById(caseId)
        if (!caseToUpdate){
            return res.status(404).json({error: "No case found"})
        }
        const tradesmanId = offer.tradesmanId
        if (!tradesmanId){
            return res.status(404).json({error: "No tradesmanid in the offer"})
        }
        const tradesman = await Tradesman.findById(tradesmanId)
        if (!tradesman){
            return res.status(404).json({error: "Tradesamn not found"})
        }
        //check to see if case already has accepted offer
        if (offer.accepted == true){
            return res.status(400).json({error: "Case already has accepted offer"})
        }
        
        offer.accepted = true
        await offer.save()

        caseToUpdate.acceptedOffer = offer._id
        caseToUpdate.status = "Posted"
        await caseToUpdate.save()

        tradesman.casesInvolved.push(caseToUpdate._id)
        await tradesman.save()  

        return res.status(200).json(caseToUpdate)
    }catch(e){
        console.log(e)
        return res.status(500).json({erro: "Internal Server error"})
    }
}


//*Cases controller for tradesman access*/

//tradesman see all the cases user post for his trade and zipcode 
const seeCases = async (req: Request, res: Response) => {
    try{
        const tradesmanId = req.user?.ID
        if(!tradesmanId){
            return res.status(400).json({error: "Trademans Id not found"})
        }
        
        const tradesman = await Tradesman.findById(tradesmanId)
        if(!tradesman){
            return res.status(400).json({error: "Tradesman not found"})
        }
        const serviceArea = await tradesman.serviceArea
        const serviceType = await tradesman.tradeOccupation
        const cases = await Case.find({
            $and: [
                {zipcode: {$in: serviceArea}},
                {caseType: serviceType},
                {status: "Posted"}
            ]
        }).exec()
        return res.status(200).json(cases)
    }catch(e){
        return res.status(500).json({error: "Internal server error"})
    }
}


export {makeNewCase, getCases, acceptOffer, seeCases}
