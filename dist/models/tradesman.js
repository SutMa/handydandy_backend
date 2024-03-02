"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Correcting the typo in variable name and "Painting"
const availableTrades = ['Electrician', 'Plumber', 'Carpenting', 'Painting', 'Auto Mechanic', 'Roofing', 'Glass'];
const serviceAreaSchema = new mongoose_1.default.Schema({
    placeId: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    radius: { type: Number, required: true } // Assuming radius is required
});
const tradesmanSchema = new mongoose_1.Schema({
    firebaseUid: {
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
    casesInvolved: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Case',
        }],
    offersPlaced: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Offer',
        }],
});
const Tradesman = mongoose_1.default.model('Tradesman', tradesmanSchema);
exports.default = Tradesman;
