const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from 'express';

export function verifyToken(req: Request, res: Response, next: NextFunction){
    const token = req.header('Authorization')
    if (!token){
        return res.status(401).json({error: "Access Denied"})
    }
    try{
        const decoded = jwt.verify(token, "my-secret-key")
        req.body.userId = decoded.userId
        next();
    }catch(e){

    }
}

