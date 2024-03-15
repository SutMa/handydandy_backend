import mongoose, { Schema, Document } from 'mongoose';

interface ICases extends Document {
    status: string;
    timeAvialible: Date[];
    timeComing: Date;
    address: string;
    chatId: mongoose.Types.ObjectId;
    tradesmanId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    zipcode: number;
    images: string;
}

const caseSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum: ['Posted', 'Pending', 'Done'], 
        default: 'Posted'
    },
    timeAvailable:[
        {
            type: Date,
            required: true,
        }
    ],
    timeComing: {
        type: Date,
        required: false,
    },
    address: {
        type: String,
        required: true
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: false
    },
    tradesmanId: {
        type: Schema.Types.ObjectId,
        ref: 'Tradesman',
        required: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    zipcode: {
        type: Schema.Types.Number,
        ref: 'User',
        required: true,
    },
    images: [{
        data: Buffer,
        contentType: String
    }],
}, { timestamps: true });

const Case = mongoose.model<ICases>('Case', caseSchema);
export default Case;
