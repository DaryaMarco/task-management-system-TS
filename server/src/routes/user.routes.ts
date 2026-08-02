import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";
import userExist from "../middleware/userExist.middleware";

const router = Router();

router.get(
    "/",
    authMiddleware,
    authorize("admin"),
    userController.getUsers
);

router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    userExist,
    userController.deleteUser
);

export default router;