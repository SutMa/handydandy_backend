// Import statements remain the same
import { Request, Response } from 'express';
import User from '../models/users';

// Interface definition remains the same
interface userInfo {
    password: string;
    email: string;
    name: string;
    address: string;
}

const userRegister = async (req: Request, res: Response) => {
    try {
        const newUser: userInfo = await new User(req.body);
        res.status(200).json({ message: 'User Registration Success' });
    } catch (e) {
        res.status(400).json({ message: "User registration failed"});
    }
};

// Export using ES Module syntax
export { userRegister };
