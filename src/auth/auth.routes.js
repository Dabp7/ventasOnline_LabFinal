import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Full name of the user
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Profile picture of the user
 *     responses:
 *       201:
 *         description: User has been created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: User registration failed
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/register",
  uploadProfilePicture.single("profilePicture"),
  registerValidator,
  register
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Login failed, server error
 *     security:
 *       - bearerAuth: []
 */
router.post(
  "/login",
  loginValidator,
  login
);

export default router;
