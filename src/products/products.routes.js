import { Router } from "express";
import { addProduct, getProducts, 
        searchProduct, updateProduct, 
        deleteProduct, getTopProducts, 
        getStockProducts, getMostProducts, 
        getProductsByCategory, getProductsByName } from "./products.controller.js";
import { createProductValidator,getProductByIdValidator, updateProductValidator, deleteCategoryValidator } from "../middlewares/products-validators.js";



const router = Router();

router.post("/addProduct", createProductValidator, addProduct);

router.get("/getProducts", getProducts);

router.get("/searchProduct", getProductByIdValidator, searchProduct);

router.put("/updateProduct/:idProduct", updateProductValidator, updateProduct);

router.delete("/deleteProduct/:idProduct", deleteCategoryValidator, deleteProduct);

router.get("/getTopProducts", getTopProducts);

router.get("/getStockProducts", getStockProducts);

router.get("/getMostProducts", getMostProducts);

router.get("/getProductsByCategory/:idCategory", getProductsByCategory);

router.get("/getProductsByName/:nameCategory", getProductsByName);


export default router;
