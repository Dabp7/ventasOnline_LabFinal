import { Router } from "express";
import { updateUser, deleteUser, updateUserAdmin, editRole } from "./user.controller.js";
import { register } from "../auth/auth.controller.js"
import { updateUserValidator, updateRoleValidator, deleteUserValidator, registerValidatorAdmin, updateUserAdminValidator } from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * /addUser:
 *   post:
 *     summary: Añade un nuevo usuario
 *     tags: 
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "password123"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "johndoe@example.com"
 *     responses:
 *       200:
 *         description: Usuario añadido exitosamente
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, se requiere autenticación
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 */

/**
 * @swagger
 * /editRole/{uid}:
 *   patch:
 *     summary: Edita el rol de un usuario
 *     tags: 
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario cuyo rol se desea editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: Nuevo rol del usuario
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Rol del usuario actualizado exitosamente
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, se requiere autenticación
 *       403:
 *         description: Prohibido, solo accesible para administradores
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 */

/**
 * @swagger
 * /editUser:
 *   put:
 *     summary: Actualiza los datos del usuario autenticado
 *     tags: 
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "johndoe@example.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, se requiere autenticación
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - user
 */

/**
 * @swagger
 * /editUserAdmin/{uid}:
 *   put:
 *     summary: Actualiza los datos de un usuario específico (solo admin)
 *     tags: 
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "johndoe@example.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, se requiere autenticación
 *       403:
 *         description: Prohibido, solo accesible para administradores
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 */

/**
 * @swagger
 * /deleteUser:
 *   delete:
 *     summary: Elimina el usuario autenticado
 *     tags: 
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, se requiere autenticación
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - user
 */

router.post("/addUser", registerValidatorAdmin, register);

router.patch("/editRole/:uid", updateRoleValidator, editRole);

router.put("/editUser/", updateUserValidator, updateUser);

router.put("/editUserAdmin/:uid", updateUserAdminValidator, updateUserAdmin);

router.delete("/deleteUser/", deleteUserValidator, deleteUser);

export default router;