"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const casesController_1 = require("../controllers/casesController");
const authUser_1 = require("../middleware/authUser");
const router = express_1.default.Router();
router.post('/create', authUser_1.verifyUserToken, casesController_1.makeNewCase);
exports.default = router;
