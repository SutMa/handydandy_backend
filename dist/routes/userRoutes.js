"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const authUser_js_1 = require("../middleware/authUser.js");
const router = express_1.default.Router();
router.post('/register', userController_js_1.userRegister);
router.get('/login', userController_js_1.userSignIn);
router.put('/edit', authUser_js_1.verifyUserToken, userController_js_1.userEdit);
exports.default = router;
