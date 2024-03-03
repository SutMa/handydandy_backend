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
    serviceArea: { // Correcting the typo in property name
        placeId: string;
        location: {
            lat: number;
            lng: number;
        };
        radius: number;
    };
    profileCompleted: boolean;
    casesInvolved: mongoose.Schema.Types.ObjectId[]; // Correcting the typo in property name
    offersPlaced: mongoose.Schema.Types.ObjectId[];
}

const serviceAreaSchema = new mongoose.Schema({
    placeId: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    radius: { type: Number, required: true } // Assuming radius is required
});

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
    serviceArea: serviceAreaSchema, // Direct use without type specification
    profileCompleted: {
        type: Boolean,
        default: false,
    },
    casesInvolved: [{ // Correctly defining as an array of references
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Case',
    }],
    offersPlaced: [{ // Correctly defining as an array of references
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer',
    }],
});

const Tradesman = mongoose.model<ITradesmen>('Tradesman', tradesmanSchema);
export default Tradesman;
