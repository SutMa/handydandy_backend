import mongoose, { Schema, Document } from 'mongoose';

interface ICases extends Document {
    caseId: mongoose.Schema.Types.ObjectId;
    
}
