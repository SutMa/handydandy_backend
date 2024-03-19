"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require('path');
const PORT = 3000;
const app = (0, express_1.default)();
// use middleware
app.use(express_1.default.json());
// import routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const tradesmanRoutes_1 = __importDefault(require("./routes/tradesmanRoutes"));
const caseRoutes_1 = __importDefault(require("./routes/caseRoutes"));
const offerRoutes_1 = __importDefault(require("./routes/offerRoutes"));
//use routes
app.use('/user', userRoutes_1.default);
app.use('/tradesman', tradesmanRoutes_1.default);
app.use('/case', caseRoutes_1.default);
app.use('/offer', offerRoutes_1.default);
//database connection
const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.uri;
mongoose.connect(uri);
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
