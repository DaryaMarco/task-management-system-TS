import jwt from "jsonwebtoken";
import { IAuthPayload } from "../interfaces/auth.interface";


const JWT_SECRET =process.env.JWT_SECRET!;

export const generateAccessToken  = (
    payload : IAuthPayload
): string =>{
    return jwt.sign(payload, JWT_SECRET,{
        expiresIn :"15min"
    });
};

export const verifyAccessToken = (
    token : string
):IAuthPayload =>{
    return jwt.verify(token, JWT_SECRET) as IAuthPayload
};

