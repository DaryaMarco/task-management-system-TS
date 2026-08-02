import { Request, Response, NextFunction } from "express";
import userRepository from "../repositories/user.repository";
import AppError from "../utils/AppError";


const userExist = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {

    const user = await userRepository.findById(
        req.params.id
    );

    if (!user) {
        throw new AppError(
            "User not found",
            404
        );
    }

    req.targetUser = user;

    next();

};


export default userExist;