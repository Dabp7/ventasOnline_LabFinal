import { Router } from "express";
import { generateInvoice } from "./buys.controller.js";
import { } from "../middlewares/category-validators.js";

const router = Router();

router.post("/completeBuy/", generateInvoice)



export default router;
