"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDB = void 0;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const client = new MongoClient(process.env.uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function runDB() {
    try {
        await client.connect();
        console.log("Pinged deployment. Successfully connected to MongoDb");
    }
    catch (e) {
        console.log(e);
    }
}
exports.runDB = runDB;
