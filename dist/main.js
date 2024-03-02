"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const dotenv = require('dotenv');
const PORT = 3000;
const appExpress = (0, express_1.default)();
try {
    (0, db_1.runDB)();
}
catch (e) {
    console.log(e);
}
//middleware
appExpress.use(express_1.default.json());
//routes
appExpress.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
