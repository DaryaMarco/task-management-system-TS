import { Router } from "express";
import taskController from "../controllers/task.controller";
import authMiddleware from "../middleware/auth.middleware";
import { createTaskSchema, updateTaskSchema } from "../validators/task.validator"; 
import validate from "../middleware/validate.middleware";

const router = Router();
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task for the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *               - priority
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn TypeScript
 *               description:
 *                 type: string
 *                 example: Complete backend project
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - in-progress
 *                   - completed
 *                 example: pending
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *                 example: high
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 65f123456789abcdef123456
 *                     title:
 *                       type: string
 *                       example: Learn TypeScript
 *                     description:
 *                       type: string
 *                       example: Complete backend project
 *                     status:
 *                       type: string
 *                       example: pending
 *                     priority:
 *                       type: string
 *                       example: high
 *                     userId:
 *                       type: string
 *                       example: 65f123456789abcdef123456
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/",
    authMiddleware,
    validate(createTaskSchema),
    taskController.createTask
);
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Returns all tasks belonging to the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 65f123456789abcdef123456
 *                       title:
 *                         type: string
 *                         example: Learn Swagger
 *                       description:
 *                         type: string
 *                         example: Add Swagger documentation
 *                       status:
 *                         type: string
 *                         enum:
 *                           - pending
 *                           - in-progress
 *                           - completed
 *                         example: pending
 *                       priority:
 *                         type: string
 *                         enum:
 *                           - low
 *                           - medium
 *                           - high
 *                         example: medium
 *                       userId:
 *                         type: string
 *                         example: 65f123456789abcdef123456
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/",
    authMiddleware,
    taskController.getMyTasks
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     description: Returns a single task by its ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *           example: 65f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 65f123456789abcdef123456
 *                     title:
 *                       type: string
 *                       example: Learn Swagger
 *                     description:
 *                       type: string
 *                       example: Add Swagger documentation
 *                     status:
 *                       type: string
 *                       enum:
 *                         - pending
 *                         - in-progress
 *                         - completed
 *                       example: pending
 *                     priority:
 *                       type: string
 *                       enum:
 *                         - low
 *                         - medium
 *                         - high
 *                       example: high
 *                     userId:
 *                       type: string
 *                       example: 65f123456789abcdef123456
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.get(
    "/:id",
    authMiddleware,
    taskController.getTask
);
/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Update a task
 *     description: Updates an existing task by its ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *           example: 65f123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Advanced TypeScript
 *               description:
 *                 type: string
 *                 example: Complete Task Management API
 *               status:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - in-progress
 *                   - completed
 *                 example: completed
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *                 example: high
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 65f123456789abcdef123456
 *                     title:
 *                       type: string
 *                       example: Learn Advanced TypeScript
 *                     description:
 *                       type: string
 *                       example: Complete Task Management API
 *                     status:
 *                       type: string
 *                       example: completed
 *                     priority:
 *                       type: string
 *                       example: high
 *                     userId:
 *                       type: string
 *                       example: 65f123456789abcdef123456
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.patch(
    "/:id",
    authMiddleware,
    validate(updateTaskSchema),
    taskController.updateTask
);
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task by its ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: string
 *           example: 65f123456789abcdef123456
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.delete(
    "/:id",
    authMiddleware,
    taskController.deleteTask
);


export default router;



