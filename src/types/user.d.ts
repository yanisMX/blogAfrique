import mongoose from "mongoose";

export type User = {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    role: string;
    isAdmin: boolean;}

