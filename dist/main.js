"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyCcPOmv8P41guoB4BCAY3O4J71Jf4LdU-o",
    authDomain: "handydandy-d3a69.firebaseapp.com",
    projectId: "handydandy-d3a69",
    storageBucket: "handydandy-d3a69.appspot.com",
    messagingSenderId: "839025763923",
    appId: "1:839025763923:web:05a13a4364b29c317288a6",
    measurementId: "G-TN5ETZPK35"
};
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
//controllers
appExpress.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
