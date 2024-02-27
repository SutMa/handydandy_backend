import express from 'express';
import {runDB} from './db';

const PORT = 3000;
const app = express();

try{
    runDB()
}catch (e){
    console.log(e);
}

//models
import User from './models/users';
import Tradesman from './models/tradesman';

//middleware
app.use(express.json())

//routes


//controllers


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
