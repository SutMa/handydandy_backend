import express from 'express';
const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require('path')

const PORT = 3000;
const app = express();



// use middleware
app.use(express.json())


// import routes
import userRegisterRoute from './routes/userRoutes'
import tradesmanRoute from './routes/tradesmanRoutes'
import caseRoute from './routes/caseRoutes'
import offerRoute from './routes/offerRoutes'

//use routes
app.use('/user', userRegisterRoute)
app.use('/tradesman', tradesmanRoute)
app.use('/case', caseRoute) 
app.use('/offer',offerRoute)

//database connection
const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.uri
mongoose.connect(uri)

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});


