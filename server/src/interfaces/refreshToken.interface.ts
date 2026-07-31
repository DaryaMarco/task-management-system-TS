import { Types } from "mongoose";

export interface IRefreshToken {
    userId : Types.ObjectId;
    hashedToken: string;
    expiresAt:Date;
    revoked : boolean;
    device: string;
    ipAddress: string;
    userAgent: string;
}