"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNewCase = void 0;
const users_1 = __importDefault(require("../models/users"));
const cases_1 = __importDefault(require("../models/cases"));
const googleCloudStorage_1 = require("../services/googleCloudStorage");
require('dotenv').config();
const makeNewCase = async (req, res) => {
    try {
        const userId = req.user?.ID;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized user" });
        }
        const user = await users_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const summary = req.body.summary;
        if (!summary) {
            console.log(summary);
            return res.status(400).json({ message: "Summary is required" });
        }
        const timeAvailable = JSON.parse(req.body.timeAvailable);
        if (!timeAvailable) {
            return res.status(400).json({ message: "Time available is required" });
        }
        const newCase = new cases_1.default({
            userId: userId,
            timeAvailable: timeAvailable,
            summary: summary,
            address: user.address,
            zipcode: user.zipcode,
        });
        await newCase.save();
        if (req.files && Array.isArray(req.files) && req.files.length <= 10) {
            const bucketName = process.env.BUCKET_NAME;
            const files = req.files;
            const imageUrls = await Promise.all(files.map(file => (0, googleCloudStorage_1.uploadImageToBucket)(file, newCase._id.toString(), bucketName)));
            newCase.images = imageUrls;
            await newCase.save();
        }
        res.status(201).json({ message: "Case created successfully", case: newCase });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.makeNewCase = makeNewCase;
