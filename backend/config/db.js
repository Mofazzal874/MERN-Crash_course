import mongoose from "mongoose";
import dotenv from "dotenv" ; 

dotenv.config() ; //to read from env

export const connectDB = async ()=>{
    try{
        if (!process.env.MONGO_URI) {
            console.error("ERROR: MONGO_URI environment variable is not set");
            process.exit(1);
        }
        
        const conn = await mongoose.connect(process.env.MONGO_URI) ; 
        console.log(`MongoDB Connected : ${conn.connection.host}`) ;
    } catch(error){
        console.error(`MongoDB Connection Error : ${error.message}`) ; 
        process.exit(1) ; //process code 1 meant exit with failure , o means success
    }
}