"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBucket = void 0;
const { Storage: GoogleCloudStorage } = require('@google-cloud/storage');
require("dotenv").config();
if (typeof process.env.GOOGLE_CLOUD_CREDENTIALS === 'undefined') {
    throw new Error('GOOGLE_CLOUD_CREDENTIALS environment variable is not set.');
}
const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS);
const storage = new GoogleCloudStorage({ credentials });
function getBucket(bucketname) {
    return storage.bucket(bucketname);
}
exports.getBucket = getBucket;
async function uploadImageToBucket(file, caseId, bucketName) {
    const bucket = getBucket(bucketName);
    const fileName = `${caseId}/${file.originalname}`;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({ resumable: false });
    await new Promise((resolve, reject) => {
        blobStream.on('error', reject);
        blobStream.on('finish', resolve);
        blobStream.end(file.buffer);
    });
    return `https://storage.googleapis.com/${bucketName}/${encodeURIComponent(fileName)}`;
}
module.exports = { uploadImageToBucket };
