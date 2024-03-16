import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        required: true,
        
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['User', 'Tradesman'], 
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    }
});


const chatSchema = new Schema({
    caseId: {
        type: Schema.Types.ObjectId,
        ref: 'Case',
        required: true,
    },
    messages: [messageSchema], 
});

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
