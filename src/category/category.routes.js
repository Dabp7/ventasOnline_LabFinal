import { Router } from "express";
import { addCategory, getCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

router.post("/addCategory/", createCategoryValidator, addCategory)

router.get("/", getCategory)

router.patch("/editCategory/:idCategory", updateCategoryValidator, updateCategory)

router.delete("/deleteCategory/:idCategory", deleteCategoryValidator, deleteCategory)


export default router;
