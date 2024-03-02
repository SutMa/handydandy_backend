import mongoose, { Schema } from 'mongoose';

const offerSchema = new Schema({
    caseId: {
        type: Schema.Types.ObjectId,
        ref: 'Case',
        required: true
    },
    tradesmanId: {
        type: Schema.Types.ObjectId,
        ref: 'Tradesman',
        required: true
    },
    message: {
        type: String,
        required: true,
        maxlength: 500, 
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
    }
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
