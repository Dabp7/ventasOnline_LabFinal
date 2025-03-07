import { Router } from "express";
import { getInvoicesByUser, getInvoicesByUserAdmin } from "./invoice.controller.js";
import { getInvoiceValidator, getInvoiceAdminValidator } from "../middlewares/invoice.validators.js";

const router = Router();

/**
 * @swagger
 * /getInvoices:
 *   get:
 *     summary: Obtiene las facturas del usuario autenticado
 *     tags: 
 *       - Facturas
 *     responses:
 *       200:
 *         description: Facturas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   invoiceId:
 *                     type: string
 *                     description: ID de la factura
 *                     example: "inv_12345"
 *                   amount:
 *                     type: number
 *                     description: Monto de la factura
 *                     example: 100.50
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de la factura
 *                     example: "2023-10-01T12:00:00Z"
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
 * /getInvoice/{uid}:
 *   get:
 *     summary: Obtiene las facturas de un usuario específico (solo admin)
 *     tags: 
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario cuyas facturas se desean obtener
 *     responses:
 *       200:
 *         description: Facturas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   invoiceId:
 *                     type: string
 *                     description: ID de la factura
 *                     example: "inv_12345"
 *                   amount:
 *                     type: number
 *                     description: Monto de la factura
 *                     example: 100.50
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de la factura
 *                     example: "2023-10-01T12:00:00Z"
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

router.get("/getInvoices", getInvoiceValidator, getInvoicesByUser);

router.get("/getInvoice/:uid", getInvoiceAdminValidator, getInvoicesByUserAdmin);

export default router;
