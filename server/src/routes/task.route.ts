import { Router } from "express";
import taskController from "../controllers/task.controller";
import authMiddleware from "../middleware/auth.middleware";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validator"; 
import validate from "../middleware/validate.middleware";

const router = Router();

router.post(
    "/",
    authMiddleware,
    validate(createTaskSchema),
    taskController.createTask
);

router.get(
    "/",
    authMiddleware,
    taskController.getMyTasks
);

router.get(
    "/:id",
    authMiddleware,
    taskController.getTask
);

router.patch(
    "/:id",
    authMiddleware,
    validate(updateTaskSchema),
    taskController.updateTask
);

router.delete(
    "/:id",
    authMiddleware,
    taskController.deleteTask
);

export default router;



