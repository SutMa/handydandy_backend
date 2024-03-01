import express from 'express';
import {runDB} from './db';
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
const appExpress = express();

try{
    runDB()
}catch (e){
    console.log(e);
}

//models
import User from './models/users';
import Tradesman from './models/tradesman';

//middleware
appExpress.use(express.json())

//routes


//controllers





appExpress.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
