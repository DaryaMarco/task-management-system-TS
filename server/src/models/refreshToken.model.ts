import { Schema, model, Document } from "mongoose";
import { IRefreshToken } from "../interfaces/refreshToken.interface";

export interface IRefreshTokenDocument
    extends IRefreshToken,
    Document {}

const refreshTokenSchema = new Schema<IRefreshTokenDocument>(

    {
    userId:{
            type : Schema.Types.ObjectId,
            ref: "User",
            required: true
    },
    
    hashedToken: {
        type: String,
        required: true,
        unique: true,
    },
    expiresAt:{
        type: Date,
        required: true,
        index:{
            expires: 0
        }
    },
    revoked:{
        type: Boolean ,
        required: false
    },

    device: {
      type: String,
      required: false,
    },

    ipAddress: {
      type: String,
      required: false,
    },

    userAgent: {
      type: String,
      required: false,
    },
    },
    {
        timestamps : true
    }
);


export default model<IRefreshTokenDocument>(
    "RefreshToken",
    refreshTokenSchema
);
