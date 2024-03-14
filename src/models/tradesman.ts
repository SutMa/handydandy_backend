import mongoose, { Schema, Document } from 'mongoose';

// Correcting the typo in variable name and "Painting"
const availableTrades = ['Electrician', 'Plumber', 'Carpenting', 'Painting', 'Auto Mechanic', 'Roofing', 'Glass'];

interface ITradesmen extends Document {
    password: string; // Added field for Firebase UID
    email: string;
    name: string;
    tradeOccupation: string;
    summary: string;
    averagePriceRange: number;
    serviceArea: number[];
    profileCompleted: boolean;
    casesInvolved: mongoose.Schema.Types.ObjectId[]; 
    offersPlaced: mongoose.Schema.Types.ObjectId[];
}



const tradesmanSchema = new Schema({
    password: { // Adding the Firebase UID field
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
        enum: availableTrades, // Using the corrected variable name
    },
    summary: {
        type: String,
        required: true,
        maxlength: 200,
    },
    averagePriceRange: {
        type: Number,
        required: true,
    },
    serviceArea: [{
            type: Number,
            require:true
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
