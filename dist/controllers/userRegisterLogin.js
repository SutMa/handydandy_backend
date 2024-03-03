"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = void 0;
const users_1 = __importDefault(require("../models/users"));
const userRegister = async (req, res) => {
    try {
        const newUser = await new users_1.default(req.body);
        res.status(200).json({ message: 'User Registration Success' });
    }
    catch (e) {
        res.status(400).json({ message: "User registration failed" });
    }
};
exports.userRegister = userRegister;
