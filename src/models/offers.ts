import mongoose, { Schema } from 'mongoose';

interface IOffer {
    tradesmanId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    price: number;
    caseId: mongoose.Types.ObjectId;
    timeComing: ITimeSlot;
    accepted: boolean;
    summary: string
}

type AvailableTrade = 'Electrician' | 'Plumber' | 'Carpenting' | 'Painting' | 'Auto Mechanic' | 'Roofing' | 'Glass';
const availableTrades: AvailableTrade[] = ['Electrician', 'Plumber', 'Carpenting', 'Painting', 'Auto Mechanic', 'Roofing', 'Glass'];

interface ITimeSlot {
    startTime: Date;
    endTime: Date;
}

const timeFrameSchema = new Schema({
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true}
})

const offerSchema = new Schema({
    tradesmanId: {
        type: Schema.Types.ObjectId,
        ref: 'Tradesman',
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    timeComing: {
        type: timeFrameSchema,
        required: true 
    },
    accepted: {
        type: Boolean,
        default: false
    },
    caseId: {
        type: Schema.Types.ObjectId,
        ref: "Case"
    },
    summary: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Offer = mongoose.model<IOffer>('Offer', offerSchema);
export default Offer;
