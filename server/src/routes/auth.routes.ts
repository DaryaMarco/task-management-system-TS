import { Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";


const router = Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Darya
 *               email:
 *                 type: string
 *                 example: darya@test.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully Registered
 *       400:
 *         description: Validation error or email already exists
 */
router.post(
    "/register",
    authController.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: darya@test.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6...
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 65f123456789abcdef123456
 *                         name:
 *                           type: string
 *                           example: Darya
 *                         email:
 *                           type: string
 *                           example: darya@test.com
 *       401:
 *         description: Invalid email or password
 */
router.post(
    "/login",
     authController.login
);
/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: New access token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIs...
 */
router.post(
     "/refresh",
     authController.refresh
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout successful and refresh token removed
 */
router.post(
    "/logout",
    authController.logout
);

/**
 * @swagger
 * /api/auth/admin-test:
 *   get:
 *     summary: Test admin authorization
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome Admin
 *       403:
 *         description: Access denied
 */
router.get(
    "/admin-test",
    authMiddleware,
    authorize("admin"),
    (req, res) => {
        res.status(200).json({
            message: "Welcome Admin!"
        });
    }
);

export default router;