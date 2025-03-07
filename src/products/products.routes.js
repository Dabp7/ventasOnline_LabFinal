import { Router } from "express";
import { addProduct, getProducts, 
        searchProduct, updateProduct, 
        deleteProduct, getTopProducts, 
        getStockProducts, getMostProducts, 
        getProductsByCategory, getProductsByName } from "./products.controller.js";
import { createProductValidator, getProductByIdValidator, updateProductValidator, deleteCategoryValidator } from "../middlewares/products-validators.js";

const router = Router();

/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Añade un nuevo producto
 *     tags: 
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: "Laptop"
 *               price:
 *                 type: number
 *                 description: Precio del producto
 *                 example: 999.99
 *               categoryId:
 *                 type: string
 *                 description: ID de la categoría del producto
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Producto añadido exitosamente
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
 * /getProducts:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: 
 *       - Productos
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del producto
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     description: Nombre del producto
 *                     example: "Laptop"
 *                   price:
 *                     type: number
 *                     description: Precio del producto
 *                     example: 999.99
 *                   categoryId:
 *                     type: string
 *                     description: ID de la categoría del producto
 *                     example: "12345"
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
 * /searchProduct/{idProduct}:
 *   get:
 *     summary: Busca un producto por ID
 *     tags: 
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a buscar
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del producto
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   description: Nombre del producto
 *                   example: "Laptop"
 *                 price:
 *                   type: number
 *                   description: Precio del producto
 *                   example: 999.99
 *                 categoryId:
 *                   type: string
 *                   description: ID de la categoría del producto
 *                   example: "12345"
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, se requiere autenticación
 *       404:
 *         description: Producto no encontrado
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
 * /updateProduct/{idProduct}:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: 
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: "Laptop"
 *               price:
 *                 type: number
 *                 description: Precio del producto
 *                 example: 999.99
 *               categoryId:
 *                 type: string
 *                 description: ID de la categoría del producto
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, se requiere autenticación
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 */

/**
 * @swagger
 * /deleteProduct/{idProduct}:
 *   delete:
 *     summary: Elimina un producto existente
 *     tags: 
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: idProduct
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       400:
 *         description: Error en la solicitud, datos inválidos
 *       401:
 *         description: No autorizado, se requiere autenticación
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 */

/**
 * @swagger
 * /getTopProducts:
 *   get:
 *     summary: Obtiene los productos más vendidos
 *     tags: 
 *       - Productos
 *     responses:
 *       200:
 *         description: Productos más vendidos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del producto
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     description: Nombre del producto
 *                     example: "Laptop"
 *                   price:
 *                     type: number
 *                     description: Precio del producto
 *                     example: 999.99
 *                   categoryId:
 *                     type: string
 *                     description: ID de la categoría del producto
 *                     example: "12345"
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
 * /getStockProducts:
 *   get:
 *     summary: Obtiene los productos en stock
 *     tags: 
 *       - Productos
 *     responses:
 *       200:
 *         description: Productos en stock obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del producto
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     description: Nombre del producto
 *                     example: "Laptop"
 *                   price:
 *                     type: number
 *                     description: Precio del producto
 *                     example: 999.99
 *                   categoryId:
 *                     type: string
 *                     description: ID de la categoría del producto
 *                     example: "12345"
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
 * /getMostProducts:
 *   get:
 *     summary: Obtiene los productos más vistos
 *     tags: 
 *       - Productos
 *     responses:
 *       200:
 *         description: Productos más vistos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del producto
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     description: Nombre del producto
 *                     example: "Laptop"
 *                   price:
 *                     type: number
 *                     description: Precio del producto
 *                     example: 999.99
 *                   categoryId:
 *                     type: string
 *                     description: ID de la categoría del producto
 *                     example: "12345"
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
 * /getProductsByCategory/{idCategory}:
 *   get:
 *     summary: Obtiene productos por categoría
 *     tags: 
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: idCategory
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del producto
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     description: Nombre del producto
 *                     example: "Laptop"
 *                   price:
 *                     type: number
 *                     description: Precio del producto
 *                     example: 999.99
 *                   categoryId:
 *                     type: string
 *                     description: ID de la categoría del producto
 *                     example: "12345"
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
 *       - user
 *       - admin
 */

/**
 * @swagger
 * /getProductsByName/{nameCategory}:
 *   get:
 *     summary: Obtiene productos por nombre de categoría
 *     tags: 
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: nameCategory
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la categoría
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del producto
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     description: Nombre del producto
 *                     example: "Laptop"
 *                   price:
 *                     type: number
 *                     description: Precio del producto
 *                     example: 999.99
 *                   categoryId:
 *                     type: string
 *                     description: ID de la categoría del producto
 *                     example: "12345"
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
 *       - user
 *       - admin
 */

router.post("/addProduct", createProductValidator, addProduct);

router.get("/getProducts", getProducts);

router.get("/searchProduct/:idProduct", getProductByIdValidator, searchProduct);

router.put("/updateProduct/:idProduct", updateProductValidator, updateProduct);

router.delete("/deleteProduct/:idProduct", deleteCategoryValidator, deleteProduct);

router.get("/getTopProducts", getTopProducts);

router.get("/getStockProducts", getStockProducts);

router.get("/getMostProducts", getMostProducts);

router.get("/getProductsByCategory/:idCategory", getProductsByCategory);

router.get("/getProductsByName/:nameCategory", getProductsByName);

export default router;