import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/ekat`);
        console.log("mongo connected sucess");
    } catch (error) {
        console.log("mongodb connection failed error", error);
    }
} 

export default connectDB