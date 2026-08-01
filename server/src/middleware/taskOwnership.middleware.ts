import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import taskRepository from "../repositories/task.repository";

const taskOwnership = async (
            req: Request<{ id: string }>,
            res: Response,
            next: NextFunction
        ) => {


        const task = await taskRepository.findById(req.params.id);

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        if (req.user.role !== "admin") {
            if (task.userId.toString() !== req.user.id) {
                throw new AppError("Forbidden", 403);
            }
        }

            if (req.user.role === "admin") {
            return next();
        }

            if (
            task.userId.toString() !== req.user.id
        ) {
            throw new AppError(
                "Forbidden",
                403
            );
        }

            next();

};

export default taskOwnership;