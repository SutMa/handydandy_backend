"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBucket = void 0;
const { Storage: GoogleCloudStorage } = require('@google-cloud/storage');
require("dotenv").config();
//Google Cloud Bucket Connection
if (typeof process.env.GOOGLE_CLOUD_CREDENTIALS === 'undefined') {
    throw new Error('GOOGLE_CLOUD_CREDENTIALS environment variable is not set.');
}
const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS);
const storage = new GoogleCloudStorage({ credentials });
function getBucket(bucketname) {
    return storage.bucket(bucketname);
}
exports.getBucket = getBucket;
