import mongoose, { Schema, Document } from 'mongoose';

const avialibleTrades = ['Electrician', 'Plumber', 'Carpeting', 'Pianting', 'Auto Mechanic', 'Roofing', 'Glass']

interface ITradesmen extends Document {
    email: string;
    name: string;
    tradeOccupation: string;
    summary: string;
    averagePriceRange: number;
    seriveArea: {
        placeId: string;
        location: {
            lat: number;
            lng: number;
        };
        radius: number;
    };
    profileCompleted: boolean;
    casesInvolvled: mongoose.Schema.Types.ObjectId[];
    isPremiumMember: boolean;
    verifiedStatus: boolean;
    subscriptionEndDate: Date;
    stripeAccountId: string;
}


const serviceAreaSchema = new mongoose.Schema({
    placeId: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    radius: { type: Number } 
  });


const tradesmanSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    tradeOccupation: {
        type: String,
        required: true,
        enum: avialibleTrades
    },
    summary: {
        type: String,
        required: true,
        maxlength: 150,
    },
    averagePriceRange: {
        type: Number,
        required: true,
    },
    serviceArea: {
        type: serviceAreaSchema,
        required: true,
    },
    profileCompleted: {
        type: Boolean,
        default: false,
    },
    casesInvolved: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Case'
    },
    isPremiumMember: {
        type: Boolean,
        default: false,
    },
    verifiedStatus: {
        type: Boolean,
        default: false,
    },
    subscriptionEndDate: {
        type: Date,
    },
    stripeAccountId: {
        type: String,
        required: false
    }
})

const Tradesman = mongoose.model<ITradesmen>('Tradesman', tradesmanSchema);
export default Tradesman;

