"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const casesController_1 = require("../controllers/casesController");
const authUser_1 = require("../middleware/authUser");
const multer_1 = __importDefault(require("multer"));
const authTradesman_1 = require("../middleware/authTradesman");
const casesController_2 = require("../controllers/casesController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
//user routes
router.post('/create', authUser_1.verifyUserToken, upload.any(), casesController_1.makeNewCase);
router.get('/get', authUser_1.verifyUserToken, casesController_1.getCases);
router.get('/accept', authUser_1.verifyUserToken, casesController_1.acceptOffer);
//tradesman routes
router.get('/see', authTradesman_1.verifyTradesmanToken, casesController_2.seeCases);
router.put('/done', authTradesman_1.verifyTradesmanToken, casesController_1.markCaseDone);
exports.default = router;
