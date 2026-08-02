import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IAuthPayload } from "../interfaces/auth.interface";
import AppError from "../utils/AppError";

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    const authHeader = req.headers.authorization;


    if(!authHeader){

       throw new AppError("No token Provided", 401);
    }


    const token = authHeader.split(" ")[1];

try{
 const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
    )as IAuthPayload;

    req.user = decoded;

    next();
}catch{
    return   next(
        new AppError(
            "Invalid or expired token",
            401
        )
    );
}
   

};


export default authMiddleware;