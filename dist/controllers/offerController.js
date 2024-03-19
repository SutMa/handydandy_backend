"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOffer = void 0;
const offers_1 = __importDefault(require("../models/offers"));
const cases_1 = __importDefault(require("../models/cases"));
const tradesman_1 = __importDefault(require("../models/tradesman"));
const isTimeSlotValid_1 = require("../helpers/isTimeSlotValid"); // Ensure this is correctly imported
const makeOffer = async (req, res) => {
    try {
        const tradesmanId = req.user?.ID;
        if (!tradesmanId) {
            return res.status(401).json({ error: "Did not find tradesmanId" });
        }
        const caseId = req.body.caseId;
        if (!caseId) {
            return res.status(401).json({ error: "No caseId" });
        }
        const caseForOffer = await cases_1.default.findById(caseId);
        if (!caseForOffer) {
            return res.status(401).json({ error: "Case not found" });
        }
        const tradesman = await tradesman_1.default.findById(tradesmanId);
        if (!tradesman) {
            return res.status(401).json({ error: "Tradesman not found" });
        }
        // Ensure timeComing from the request is structured correctly
        const timeComing = {
            date: new Date(req.body.date), // Assuming req.body.timeComing.date is an ISO string
            timeRange: req.body.timeRange // Assuming req.body.timeComing.timeRange is a string like "09:00-10:00"
        };
        // Validate the time slot
        const isValidTimeSlot = (0, isTimeSlotValid_1.isTimeSlotValid)(timeComing, caseForOffer.timeAvailable);
        if (!isValidTimeSlot) {
            return res.status(400).json({ error: "Selected time slot not available" });
        }
        // Proceed with creating the offer
        const newOffer = new offers_1.default({
            tradesmanId: tradesman._id,
            userId: caseForOffer.userId,
            price: req.body.price,
            timeComing: timeComing, // Assuming you handle this object correctly in your schema
            caseId: caseForOffer._id,
            summary: req.body.summary,
        });
        await newOffer.save();
        return res.status(201).json(newOffer);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.makeOffer = makeOffer;
