import mongoose, { Schema, Document } from 'mongoose';


type AvailableTrade = 'Electrician' | 'Plumber' | 'Carpenting' | 'Painting' | 'Auto Mechanic' | 'Roofing' | 'Glass';
const availableTrades: AvailableTrade[] = ['Electrician', 'Plumber', 'Carpenting', 'Painting', 'Auto Mechanic', 'Roofing', 'Glass'];

interface ITradesmen extends Document {
    password: string;
    email: string;
    name: string;
    tradeOccupation: AvailableTrade;
    summary: string;
    averagePriceRange: number;
    serviceArea: number[];
    profileCompleted: boolean;
    casesInvolved: mongoose.Schema.Types.ObjectId[]; 
    offersPlaced: mongoose.Schema.Types.ObjectId[];
}

const tradesmanSchema = new Schema({
    password: { 
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
    tradeOccupation: {
        type: String, 
        required: true,
        enum: availableTrades, 
    },
    summary: {
        type: String,
        required: true,
        maxlength: 300,
    },
    averagePriceRange: {
        type: Number,
        required: true,
    },
    serviceArea: [{
        type: Number,
        required: true
    }],
    profileCompleted: { 
        type: Boolean,
        default: false, 
    },
    casesInvolved: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Case',
    }],
    offersPlaced: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer',
    }],
});

const Tradesman = mongoose.model<ITradesmen>('Tradesman', tradesmanSchema);
export default Tradesman;
