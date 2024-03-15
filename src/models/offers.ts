import mongoose, { Schema } from 'mongoose';

interface IOffer {
    tradesmanId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    price: number;
    caseId: mongoose.Types.ObjectId;
    timeComing: Date;
    accepted: boolean;
}

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
        type: Date,
        required: true 
    },
    accepted: {
        type: Boolean,
        default: false
    },
    caseId: {
        type: Schema.Types.ObjectId,
        ref: ""
    }
}, { timestamps: true });

const Offer = mongoose.model<IOffer>('Offer', offerSchema);
export default Offer;
