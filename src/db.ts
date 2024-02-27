const {MongoClient, ServerApiVersion} = require('mongodb');
require ('dotenv').config();

const client  = new MongoClient(process.env.uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export async function runDB(){
    try{
        await client.connect();
        console.log("Pinged deployment. Successfully connected to MongoDb");
    } catch (e){
        console.log(e);
    }
}


