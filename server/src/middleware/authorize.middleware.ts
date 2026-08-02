import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { UserRole } from "../interfaces/role.type";

const authorize =
    (...roles: UserRole[]) =>
    (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        if (!req.user) {
            throw new AppError("Unauthorized", 401);
        }

        if (!roles.includes(req.user.role)) {
            throw new AppError("Forbidden", 403);
        }

        next();
    };

export default authorize;