import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  name: string;
  address: string;
  profileCompleted: boolean;
  cases: mongoose.Types.ObjectId[];
  stripeCustomerId: string;
}

const userSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        auto: true,
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
    stripeCustomerId: {
        type: String,
        required: false,
    },

});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
