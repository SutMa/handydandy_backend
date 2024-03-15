const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from 'express';

export function verifyTradesmanToken(req: Request, res: Response, next: NextFunction){
    const token = req.header('Authorization')
    if (!token){
        return res.status(401).json({error: "Access Denied"})
    }
    try{
        const decoded = jwt.verify(token, "my-secret-key")
        console.log(decoded)
        req.user = {ID: decoded.tradesmanId}
        next();
    }catch(e){
        if (e instanceof jwt.TokenExpiredError){
            return res.status(401).json({error: "Token expired"})
        }else if (e instanceof jwt.JsonWebTokenError){
            return res.status(401).json({error: "Invalid token"})
        }
        return res.status(401).json({error: "Access Denied because of internal error"})
    }
}

