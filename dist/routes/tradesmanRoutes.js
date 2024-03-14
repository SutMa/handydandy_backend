"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tradesmanController_1 = require("../controllers/tradesmanController");
const router = express_1.default.Router();
router.post('/register', tradesmanController_1.tradesmanRegister);
router.get('/login', tradesmanController_1.tradesmanSignIn);
exports.default = router;
