import { Request, Response } from "express";
import mongoose from 'mongoose';
import Offer from "../models/offers";
import Case from '../models/cases';
import Tradesman from "../models/tradesman";
import { isTimeSlotValid } from "../helpers/isTimeSlotValid"; // Ensure this is correctly imported

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

        // Ensure timeComing from the request is structured correctly
        const timeComing = {
            date: new Date(req.body.date), // Assuming req.body.timeComing.date is an ISO string
            timeRange: req.body.timeRange // Assuming req.body.timeComing.timeRange is a string like "09:00-10:00"
        };

        // Validate the time slot
        const isValidTimeSlot = isTimeSlotValid(timeComing, caseForOffer.timeAvailable);
        if (!isValidTimeSlot) {
            return res.status(400).json({ error: "Selected time slot not available" });
        }

        // Proceed with creating the offer
        const newOffer = new Offer({
            tradesmanId: tradesman._id,
            userId: caseForOffer.userId,
            price: req.body.price,
            timeComing: timeComing, // Assuming you handle this object correctly in your schema
            caseId: caseForOffer._id,
            summary: req.body.summary,
        });

        await newOffer.save();
        return res.status(201).json(newOffer);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export { makeOffer };
