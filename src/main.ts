import express from 'express';
import {runDB} from './db';


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
import bodyParser from 'body-parser';

// use middleware
appExpress.use(express.json)

// import routes
import userRegisterRoute from './routes/loginRoute'

//use routes
appExpress.use('/user', userRegisterRoute)

appExpress.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
