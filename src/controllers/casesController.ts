import {Request, Response} from 'express'
import mongoose from 'mongoose'
import User from '../models/users'
import Case from '../models/cases'
import Tradesman from '../models/tradesman'
import { getBucket } from '../services/googleCloudStorage'
import { uploadImageToBucket } from '../services/googleCloudStorage'
import multer from 'multer'
require('dotnenv').config()

const upload = multer({ storage: multer.memoryStorage() })


const makeNewCase = async (req: Request, res: Response) => {
    try{
        const userId = req.user?.ID
        if(!userId){
            return res.status(401).json({error: "Unauthorized user"})
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({error: "User not found"})
        }

        const {timeAvailable, summary} = req.body
        if(!timeAvailable){
            return res.status(400).json({message: "Time avialable is required"})
        }
        if(!summary){
            return res.status(400).json({message: "Summary is required"})
        }

        const newCase = new Case({
            userId: userId,
            timeAvialible: timeAvailable.map(d: Date => new Date(date)),
            summary: summary,
            address: user.address,
            zipcode: user.zipcode,
        })

        await newCase.save()

        if (req.files && Array.isArray(req.files)){
            const bucketName = process.env.BUCKET_NAME as string
            const files = req.files as Express.Multer.File[]

            const imageUrls = await Promise.all(files.map(
                file => uploadImageToBucket(file, newCase._id.toString(), bucketName)
            ))

            newCase.images = imageUrls
            await newCase.save()
        }
        res.status(201).json({message: "Case created successfully"})
    }catch(e){
        console.log(e)
        return res.status(400).json({error: "Internal Server Error"})
    }
}

const updateCase = async (req: Request, res: Response) => {

}

const deleteCase = async (req: Request, res: Response) => {

}



export {makeNewCase, updateCase, deleteCase}
