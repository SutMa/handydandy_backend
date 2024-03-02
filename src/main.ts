import express from 'express';
import {runDB} from './db';
const dotenv = require('dotenv')

const PORT = 3000;
const appExpress = express();

try{
    runDB()
}catch (e){
    console.log(e);
}

//models
import User from './models/users';
import Tradesman from './models/tradesman';
import Case from './models/cases'
import Offer from './models/offers'
import Chat from './models/chat'

//middleware
appExpress.use(express.json())

//routes





appExpress.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
