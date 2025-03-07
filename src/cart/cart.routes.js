import { Router } from "express";
import { addProductCart, getUserCart, removeProduct} from "./cart.controller.js";
import { ProductCartValidator, getCartValidator, deleteProductValidator} from "../middlewares/cart-validators.js";

const router = Router();

router.post("/addProductCart", ProductCartValidator, addProductCart)

router.get("/getCart", getCartValidator, getUserCart)

router.delete("/removeProduct/:idProduct", deleteProductValidator, removeProduct)

export default router;
