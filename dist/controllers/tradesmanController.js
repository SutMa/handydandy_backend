"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradesmanRegister = exports.tradesmanSignIn = void 0;
const tradesman_1 = __importDefault(require("../models/tradesman"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tradesmanRegister = async (req, res) => {
    try {
        const { password } = req.body;
        delete req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        const newTradesman = await tradesman_1.default.create(req.body);
        res.status(200).json({ message: "Tradesman Registrataion Success" });
    }
    catch (e) {
        res.status(400).json({ message: "Tradesman registration failed" });
    }
};
exports.tradesmanRegister = tradesmanRegister;
const tradesmanSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const tradesman = await tradesman_1.default.findOne({ email });
        if (!tradesman) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        const matchedPassword = await bcrypt.compare(password, tradesman.password);
        if (!matchedPassword) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        const token = jwt.sign({ tradesmanId: tradesman._id }, "my-secret-key", { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (e) {
        res.status(500).json({ error: "Login Failed" });
    }
};
exports.tradesmanSignIn = tradesmanSignIn;
