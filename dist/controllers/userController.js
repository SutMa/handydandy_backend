"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignIn = exports.userRegister = void 0;
const users_1 = __importDefault(require("../models/users"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRegister = async (req, res) => {
    try {
        console.log("trying to register the user");
        const { password } = req.body;
        delete req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        const newUser = await users_1.default.create(req.body);
        res.status(200).json({ message: 'User Registration Success' });
        console.log("success");
    }
    catch (e) {
        res.status(400).json({ message: "User registration failed" });
        console.log(e);
    }
};
exports.userRegister = userRegister;
const userSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        const token = jwt.sign({ userId: user._id }, "my-secret-key", { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (e) {
        res.status(500).json({ error: "Login Failed" });
    }
};
exports.userSignIn = userSignIn;
