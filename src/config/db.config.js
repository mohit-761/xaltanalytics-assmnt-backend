import './env.config.js';
import mongoose from "mongoose";

export async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('db connected successfully');
    } catch (error) {
        console.log('got error in db connection: ', error);
    }
}