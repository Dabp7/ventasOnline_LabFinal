import { body, param } from "express-validator";
import { categoryExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nameCategory").notEmpty().withMessage("El nombre de la categoria es requerida"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    validarCampos,
    handleErrors
];

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("idCategory", "No es un ID válido").isMongoId(),
    param("idCategory").custom(categoryExists),
    validarCampos,
    handleErrors
]


export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("idCategory", "No es un ID válido").isMongoId(),
    param("idCategory").custom(categoryExists),
    validarCampos,
    handleErrors
]