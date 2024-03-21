"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffers = exports.makeOffer = void 0;
const offers_1 = __importDefault(require("../models/offers"));
const cases_1 = __importDefault(require("../models/cases"));
const tradesman_1 = __importDefault(require("../models/tradesman"));
const timeValidation_1 = require("../helpers/timeValidation");
//tradesman makes an offer
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
        const timeComing = req.body.timeComing;
        if (!timeComing) {
            return res.status(401).json({ error: "Time coming field is not found" });
        }
        if (!(0, timeValidation_1.timeValidation)(timeComing, caseForOffer.timeAvailable)) {
            return res.status(401).json({ error: "Time is not valid for this case" });
        }
        const newOffer = new offers_1.default({
            tradesmanId: tradesman._id,
            userId: caseForOffer.userId,
            price: req.body.price,
            timeComing: timeComing,
            caseId: caseForOffer._id,
            summary: req.body.summary,
        });
        await newOffer.save();
        await tradesman_1.default.updateOne({ _id: tradesmanId }, { $push: { offersPlaced: newOffer._id } });
        return res.status(201).json(newOffer);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.makeOffer = makeOffer;
//tradesman see the offers they posted
const getOffers = async (req, res) => {
    try {
        const tradesmanId = req.user?.ID;
        if (!tradesmanId) {
            return res.status(400).json({ error: "No tradesman ID" });
        }
        const tradesman = await tradesman_1.default.findById(tradesmanId);
        if (!tradesman) {
            return res.status(400).json({ error: "Tradesman not found" });
        }
        const offersToFind = await tradesman.offersPlaced;
        console.log(offersToFind);
        const offers = await offers_1.default.find({ _id: { $in: offersToFind } }).exec();
        return res.status(200).json(offers);
    }
    catch (e) {
        return res.status(500).json({ error: "Internal server errror" });
    }
};
exports.getOffers = getOffers;
