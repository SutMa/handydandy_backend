import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    password: string;
    email: string;
    name: string;
    address: string;
    profileCompleted: boolean;
    cases: mongoose.Types.ObjectId[];
    zipcode: number;
}

const userSchema = new Schema({
    password: { 
        type: String,
        required: true,
        unique: false,
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
    zipcode:{
        type: Number,
        required: true,
    },
    profileCompleted: {
        type: Boolean,
        default: true,
    },
    cases: [
        { type: Schema.Types.ObjectId, ref: 'Case'}
    ],
    
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;


