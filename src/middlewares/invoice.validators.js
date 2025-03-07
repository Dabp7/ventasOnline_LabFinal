import { param } from "express-validator";
import { userExists } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";



export const getInvoiceValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];


export const getInvoiceAdminValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
];