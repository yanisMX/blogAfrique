import mongoose from "mongoose";

export const AfricaSchema = new mongoose.Schema({
    title: {
    
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    category : {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date()}
});