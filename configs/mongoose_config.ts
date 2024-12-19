import { Connection } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const MONGODBURL = <string>process.env.MONGODB;


// Create mongoose options.
export const mongooseOptions = {
    onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('🚀 Mongodb connected successfully.'));
        connection.on('open', () => console.log('🟢 Mongodb opened successfully. '));
        connection.on('disconnected', () => console.log('🛑 Mongodb disconnected successfully.'));
        connection.on('reconnected', () => console.log('📡 Mongodb reconnected successfully...'));
        connection.on('disconnecting', () => console.log('🚪 Mongodb disconnecting...'));
    }
}