import mongoose from "mongoose";
import logger from "./logger";
import dns from "dns";

if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const connectDB = async (): Promise<void> => {

  const mongoURI = process.env.MONGO_URI;

  if(!mongoURI){
        logger.error("MONGO_URI is not defined");
        throw new Error("MONGO_URI is not defined");

  }

    await mongoose.connect(mongoURI as string);
    

    logger.info(
    "MongoDB connected successfully ✅"
  );
};


export default connectDB;