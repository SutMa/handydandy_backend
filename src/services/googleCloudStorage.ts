const { Storage: GoogleCloudStorage} = require('@google-cloud/storage');
import multer from 'multer'
require("dotenv").config()

if (typeof process.env.GOOGLE_CLOUD_CREDENTIALS === 'undefined') {
    throw new Error('GOOGLE_CLOUD_CREDENTIALS environment variable is not set.');
}
const credentials = JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS)
const storage = new GoogleCloudStorage({ credentials })

export function getBucket(bucketname: string) {
    return storage.bucket(bucketname)
}

async function uploadImageToBucket(file: Express.Multer.File, caseId: string, bucketName: string) {
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

export { uploadImageToBucket };

