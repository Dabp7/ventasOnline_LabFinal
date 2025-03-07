import { Router } from "express";
import { generateInvoice } from "./buys.controller.js";
import { completeBuyValidator } from "../middlewares/buys-validators.js";

/**
 * @swagger
 * /completeBuy/:
 *   post:
 *     summary: Completa una compra y genera una factura
 *     tags: 
 *       - Compras
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID del producto a comprar
 *                 example: "12345"
 *               quantity:
 *                 type: integer
 *                 description: Cantidad del producto a comprar
 *                 example: 2
 *               paymentMethod:
 *                 type: string
 *                 description: Método de pago utilizado
 *                 example: "credit_card"
 *     responses:
 *       200:
 *         description: Compra completada y factura generada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 invoiceId:
 *                   type: string
 *                   description: ID de la factura generada
 *                   example: "inv_12345"
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
 *       - admin
 */

const router = Router();

router.post("/completeBuy/", completeBuyValidator, generateInvoice)

export default router;
