import { Request, Response } from 'express';
import User from '../models/users'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


interface userInfo {
    password: string;
    email: string;
    name: string;
    address: string;
    zipcode: number;
}

const userRegister = async (req: Request, res: Response) => {
    try {
        const {password}  = req.body
        delete req.body.password
        const hashedPassword = await bcrypt.hash(password, 10)
        req.body.password = hashedPassword
        const newUser: userInfo = await User.create(req.body)
        res.status(200).json({ message: 'User Registration Success' })
    } catch (e) {
        res.status(400).json({ message: "User registration failed"})
    }
};

const userSignIn = async (req: Request, res: Response) => {
    try{
        const {email, password}  = req.body
        const user  = await User.findOne({email})
        if(!user){
            return res.status(401).json({error: "Authentication failed"})
        }
        const matchedPassword = await bcrypt.compare(password, user.password);
        if(!matchedPassword){
            return res.status(401).json({error: "Authentication failed"})
        }
        const token = jwt.sign({userId: user._id}, "my-secret-key", {expiresIn:'360h'})
        res.status(200).json({token})
    }catch(e){
        res.status(500).json({error: "Login Failed"})
    }
}

const userEdit = async (req: Request, res: Response) => {
    if (!req.user){
        return res.status(400).json({error: "User not logged in"})
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.user.ID, {address: req.body.address, zipcode: req.body.zipcode}, {new: true})
        return res.status(200).json(updatedUser)
    }catch(e){
        return res.status(500).json({error: "Internal server error"})
    }
}

export { userRegister, userSignIn, userEdit };


