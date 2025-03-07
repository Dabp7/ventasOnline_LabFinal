import { Router } from "express";
import { addCategory, getCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * /addCategory/:
 *   post:
 *     summary: Añade una nueva categoría
 *     tags: 
 *       - Categorías
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *                 example: "Electrónica"
 *               description:
 *                 type: string
 *                 description: Descripción de la categoría
 *                 example: "Productos electrónicos y gadgets"
 *     responses:
 *       200:
 *         description: Categoría añadida exitosamente
 *       400:
 *         description: Error en la solicitud, datos inv��lidos
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
 * /:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: 
 *       - Categorías
 *     responses:
 *       200:
 *         description: Categorías obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la categoría
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     description: Nombre de la categoría
 *                     example: "Electrónica"
 *                   description:
 *                     type: string
 *                     description: Descripción de la categoría
 *                     example: "Productos electrónicos y gadgets"
 *       401:
 *         description: No autorizado, se requiere autenticación
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - user
 *       - admin
 */

/**
 * @swagger
 * /editCategory/{idCategory}:
 *   patch:
 *     summary: Actualiza una categoría existente
 *     tags: 
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: idCategory
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *                 example: "Electrónica"
 *               description:
 *                 type: string
 *                 description: Descripción de la categoría
 *                 example: "Productos electrónicos y gadgets"
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, se requiere autenticación
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 */

/**
 * @swagger
 * /deleteCategory/{idCategory}:
 *   delete:
 *     summary: Elimina una categoría existente
 *     tags: 
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: idCategory
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, se requiere autenticación
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 */

router.post("/addCategory/", createCategoryValidator, addCategory);

router.get("/", getCategory);

router.patch("/editCategory/:idCategory", updateCategoryValidator, updateCategory);

router.delete("/deleteCategory/:idCategory", deleteCategoryValidator, deleteCategory);

export default router;
