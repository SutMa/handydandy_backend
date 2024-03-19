"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const casesController_1 = require("../controllers/casesController");
const authUser_1 = require("../middleware/authUser");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post('/create', authUser_1.verifyUserToken, upload.any(), casesController_1.makeNewCase);
exports.default = router;
