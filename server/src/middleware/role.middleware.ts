import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

const authorize =
(...roles :("admin" | "user")[])=>(
    req: Request,
    res:Response,
    next:NextFunction
)=>{
    if(!req.user){
        throw new AppError(
            "unauthorize",
            401
        );
    }
    if(!roles.includes(req.user.role)){
        throw new AppError(
            "Forbiddden",
            403
        );
    }
    next();
}

export default authorize;