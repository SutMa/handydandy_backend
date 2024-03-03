"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRegisterLogin_js_1 = require("../controllers/userRegisterLogin.js");
const router = express_1.default.Router();
router.post('/register', userRegisterLogin_js_1.userRegister);
router.get('/login', (req, res) => {
});
exports.default = router;
