import { get } from "mongoose";

const { Storage: GoogleCloudStorage} = require('@google-cloud/storage');
require("dotenv").config()
//Google Cloud Bucket Connection
if (typeof process.env.GOOGLE_CLOUD_CREDENTIALS === 'undefined') {
    throw new Error('GOOGLE_CLOUD_CREDENTIALS environment variable is not set.');
}
const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS)
const  storage = new GoogleCloudStorage({ credentials })

export function getBucket(bucketname: string) {
    return storage.bucket(bucketname)
}

