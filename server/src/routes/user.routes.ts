import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/authorize.middleware";
import userExist from "../middleware/userExist.middleware";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       403:
 *         description: Admin access required
 */
router.get(
    "/",
    authMiddleware,
    authorize("admin"),
    userController.getUsers
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 66a123456789
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    userExist,
    userController.deleteUser
);

export default router;