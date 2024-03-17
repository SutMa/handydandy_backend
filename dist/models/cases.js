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
const timeSlotSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    timeRange: { type: String, required: true }
});
const caseSchema = new mongoose_1.Schema({
    status: {
        type: String,
        required: true,
        enum: ['Posted', 'Pending', 'Done'],
        default: 'Posted'
    },
    timeAvailable: [
        timeSlotSchema
    ],
    timeComing: {
        type: Date,
        required: false,
    },
    address: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    chatId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    tradesmanId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Tradesman',
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    zipcode: {
        type: mongoose_1.Schema.Types.Number,
        ref: 'User',
        required: true,
    },
    images: [{
            type: String,
        }],
    summary: {
        type: String,
    }
}, { timestamps: true });
const Case = mongoose_1.default.model('Case', caseSchema);
exports.default = Case;
