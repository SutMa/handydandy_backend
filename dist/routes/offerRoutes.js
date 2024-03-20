"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authTradesman_1 = require("../middleware/authTradesman");
const offerController_1 = require("../controllers/offerController");
const router = express_1.default.Router();
router.post("/create", authTradesman_1.verifyTradesmanToken, offerController_1.makeOffer);
router.get("/get", authTradesman_1.verifyTradesmanToken, offerController_1.getOffers);
exports.default = router;
