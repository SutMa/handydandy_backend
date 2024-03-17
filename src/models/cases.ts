import mongoose, { Schema, Document } from 'mongoose';

interface ICases extends Document {
    status: string;
    timeAvialible: ITimeSlot[];
    timeComing: Date;
    address: string;
    chatId: mongoose.Types.ObjectId;
    tradesmanId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    zipcode: number;
    images: string[];
    summary: string;
}

interface ITimeSlot {
    date: Date;
    timeRange: string;
}

const timeSlotSchema = new Schema({
    date: {type: Date, required: true},
    timeRange: {type: String, required: true}
})

const caseSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum: ['Posted', 'Pending', 'Done'], 
        default: 'Posted'
    },
    timeAvailable:[
        timeSlotSchema
    ],
    timeComing: {
        type: Date,
        required: false,
    },
    address: {
        type: Schema.Types.ObjectId,
        required: true
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
    },
    tradesmanId: {
        type: Schema.Types.ObjectId,
        ref: 'Tradesman',
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
        type: String,
    }],
    summary: {
        type: String,
    }
}, { timestamps: true });

const Case = mongoose.model<ICases>('Case', caseSchema);
export default Case;
