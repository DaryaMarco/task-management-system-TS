import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";


const userSchema = new Schema<IUser>(
  {

    name: {
      type: String,
      required: true,
      trim: true
    },


    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },


    password: {
      type: String,
      required: true
    },


    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }

  },
  {
    timestamps: true
  }
);



const User = mongoose.model<IUser>(
  "User",
  userSchema
);


export default User;