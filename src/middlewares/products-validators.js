import { body, param } from "express-validator";
import { categoryExists, productExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nameProduct").notEmpty().withMessage("El nombre del producto es requerido"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    body("price").notEmpty().withMessage("El precio es requerido"),
    body("stock").notEmpty().withMessage("Stock es requerido"),
    body("category").notEmpty().withMessage("La categoría es requerida"),
    body("category").custom(categoryExists),
    validarCampos,
    handleErrors
];

export const getProductByIdValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("idProduct").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("idProduct").custom(productExists),
    validarCampos,
    handleErrors
];

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("idProduct", "No es un ID válido").isMongoId(),
    param("idProduct").custom(productExists),
    validarCampos,
    handleErrors
]


export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("idProduct", "No es un ID válido").isMongoId(),
    param("idProduct").custom(productExists),
    validarCampos,
    handleErrors
]