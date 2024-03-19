import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/users';
import Case from '../models/cases';
import { uploadImageToBucket } from '../services/googleCloudStorage';


require('dotenv').config();

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

        const summary = req.body.summary as {  summary: string };
        
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

        res.status(201).json({ message: "Case created successfully", case: newCase });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



export {makeNewCase}
