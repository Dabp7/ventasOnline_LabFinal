import { body, param} from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { productExists } from "../helpers/db-validators.js";


export const ProductCartValidator = [
    validateJWT,
    body("nameProduct").notEmpty().withMessage("El nombre del producto es requerido"),
    validarCampos,
    handleErrors
];

export const getCartValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];

export const deleteProductValidator = [
    validateJWT,
    param("idProduct").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("idProduct").custom(productExists),
    validarCampos,
    handleErrors
];
