import mongoose from "mongoose";
import { dbname } from "../constants.js";


const ConnectDb = async () => {
    try {
        console.log("Connecting  to MongoDB with URI:", process.env.MONGODB_URI);
        const ConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dbname}`)

        console.log(`MongoDB connected: Dbhost:${ConnectionInstance.connection.host}`)
        console.log("Connected to DB:", mongoose.connection.name);
    } catch (error) {
        console.log("MongoDb connection error", error);
        process.exit(1)
    }
}
export default ConnectDb