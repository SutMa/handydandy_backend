import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    password: string;
    email: string;
    name: string;
    address: string;
    profileCompleted: boolean;
    cases: mongoose.Types.ObjectId[];
}

const userSchema = new Schema({
    password: { // Add this field
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profileCompleted: {
        type: Boolean,
        default: false,
    },
    cases: [
        { type: Schema.Types.ObjectId, ref: 'Case' }
    ],
    default: []
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;


