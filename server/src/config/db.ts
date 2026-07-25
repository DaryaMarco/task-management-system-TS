import mongoose from "mongoose";


const connectDB = async (): Promise<void> => {

  const mongoURI = process.env.MONGO_URI;

  if(!mongoURI){
    throw new Error(
      "MONGO_URI is not defined"
    );
  }

  await mongoose.connect(mongoURI);

    console.log(
    "MongoDB connected successfully ✅"
  );
};


export default connectDB;