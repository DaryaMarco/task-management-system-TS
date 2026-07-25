import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IAuthPayload } from "../interfaces/auth.interface";

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    const authHeader = req.headers.authorization;


    if(!authHeader){

        return res.status(401).json({
            message:"No token provided"
        });

    }


    const token = authHeader.split(" ")[1];


    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
    )as IAuthPayload;


    req.user = decoded;

    next();

};


export default authMiddleware;