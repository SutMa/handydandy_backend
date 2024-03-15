"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNewCase = void 0;
const users_1 = __importDefault(require("../models/users"));
const cases_1 = __importDefault(require("../models/cases"));
const makeNewCase = async (req, res) => {
    if (!req.user) {
        return res.status(401).send("User not authenticated");
    }
    try {
        const user = await users_1.default.findById(req.user.ID);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const userId = req.user.ID;
        req.body.userId = userId;
        if (user.zipcode) {
            req.body.zipcode = user.zipcode;
        }
        const newCase = await cases_1.default.create(req.body);
        return res.status(200).json({ success: "Case created" });
    }
    catch (e) {
        return res.status(500).json({ error: "Case creation error" });
    }
};
exports.makeNewCase = makeNewCase;
const updateCase = async (req, res) => {
};
const deleteCase = async (req, res) => {
};
