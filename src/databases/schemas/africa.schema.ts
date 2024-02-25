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
        default: Date()},
        comments: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                content: String,
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
});