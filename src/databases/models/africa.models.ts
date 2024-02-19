import mongoose from "mongoose";
import { AfricaSchema } from "../schemas/africa.schema";

export const AfricaModel = mongoose.model('Africa', AfricaSchema);