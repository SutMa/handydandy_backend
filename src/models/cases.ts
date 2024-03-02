import mongoose, { Schema } from 'mongoose';

const caseSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum: ['Posted', 'Pending', 'Done'], 
        default: 'Posted'
    },
    timeAvailable: {
        type: Date,
        required: true
    },
    timeComing: {
        type: Date 
    },
    address: {
        type: String,
        required: true
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    firebaseUid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tradesmanId: {
        type: Schema.Types.ObjectId,
        ref: 'Tradesman' // This can be initially null until a tradesman is assigned
    }
});

const Case = mongoose.model('Case', caseSchema);
export default Case;
