"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const PORT = 3000;
const appExpress = (0, express_1.default)();
try {
    (0, db_1.runDB)();
}
catch (e) {
    console.log(e);
}
// use middleware
appExpress.use(express_1.default.json);
// import routes
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
//use routes
appExpress.use('/user', loginRoute_1.default);
appExpress.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
