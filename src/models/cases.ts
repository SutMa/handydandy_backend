import mongoose, { Schema, Document } from 'mongoose';

type AvailableTrade = 'Electrician' | 'Plumber' | 'Carpenting' | 'Painting' | 'Auto Mechanic' | 'Roofing' | 'Glass';
const availableTrades: AvailableTrade[] = ['Electrician', 'Plumber', 'Carpenting', 'Painting', 'Auto Mechanic', 'Roofing', 'Glass'];

interface ICases extends Document {
    status: string;
    timeAvailable: ITimeSlot[];
    timeComing: ITimeSlot;
    address: string;
    chatId: mongoose.Types.ObjectId;
    tradesmanId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    zipcode: number;
    images: string[];
    summary: string;
    caseType: AvailableTrade;
    acceptedOffer: mongoose.Types.ObjectId;
}

interface ITimeSlot {
    startTime: Date;
    endTime: Date;
}

const timeFrameSchema = new Schema({
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true}
})

const caseSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum: ['Posted', 'Pending', 'Done'], 
        default: 'Posted'
    },
    timeAvailable:[
        timeFrameSchema
    ],
    timeComing: {
        type: timeFrameSchema,
        required: false,
    },
    address: {
        type: String,
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
        required: false,
    }],
    summary: {
        type: String,
        required: true,
    },
    caseType: {
        type: String, 
        required: true,
        enum: availableTrades, 
    },
    acceptedOffer: {
        type: Schema.Types.ObjectId,
        ref: "Offer",
    }
}, { timestamps: true });

const Case = mongoose.model<ICases>('Case', caseSchema);
export default Case;
