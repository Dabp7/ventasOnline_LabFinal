import { body, param} from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";


export const completeBuyValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];


