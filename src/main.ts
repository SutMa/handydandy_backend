import express from 'express';
const { MongoClient, ServerApiVersion } = require("mongodb");
const {Storage} = require ('@google-cloud/storage')
const path = require('path')

const PORT = 3000;
const app = express();

//models
import User from './models/users';
import Tradesman from './models/tradesman';
import Case from './models/cases'
import Offer from './models/offers'
import Chat from './models/chat'
import bodyParser from 'body-parser';

// use middleware
app.use(express.json())


// import routes
import userRegisterRoute from './routes/userRoutes'
import tradesmanRoute from './routes/tradesmanRoutes'
import caseRoute from './routes/caseRoutes'
import { cert } from 'firebase-admin/app';

//use routes
app.use('/user', userRegisterRoute)
app.use('/tradesman', tradesmanRoute)
app.use('/case', caseRoute) 

//database connection
const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.uri
mongoose.connect(uri)

//Google Cloud Bucket Connection
if (typeof process.env.GOOGLE_CLOUD_CREDENTIALS === 'undefined') {
    throw new Error('GOOGLE_CLOUD_CREDENTIALS environment variable is not set.');
}
const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS)
const storage = new Storage({ credentials})


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});


