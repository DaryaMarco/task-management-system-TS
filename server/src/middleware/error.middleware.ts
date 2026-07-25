import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";


const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {


    if (err instanceof AppError) {

        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });

    }

    if (process.env.NODE_ENV !== "test") {
    console.error(err);
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });

};


export default errorHandler;