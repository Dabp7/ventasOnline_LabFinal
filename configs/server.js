"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js"
import categoryRoutes from "../src/category/category.routes.js"
import productRoutes from "../src/products/products.routes.js"
import cartRoutes from "../src/cart/cart.routes.js"
import buyRoutes from "../src/buys/buys.routes.js"
import invoiceRoutes from "../src/invoice/invoice.routes.js"
import { createCategoryDefault } from "../src/category/category.controller.js"
import { swaggerDocs, swaggerUi } from "./swagger.js";
import { adminDefaultCreated } from "../src/user/user.controller.js"


const middlewares = (app) => {
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
};

const routes = (app) => {
    app.use("/ventaOnline/v1/auth", authRoutes);
    app.use("/ventaOnline/v1/user", userRoutes);
    app.use("/ventaOnline/v1/category", categoryRoutes);
    app.use("/ventaOnline/v1/product", productRoutes);
    app.use("/ventaOnline/v1/cart", cartRoutes);
    app.use("/ventaOnline/v1/buy", buyRoutes);
    app.use("/ventaOnline/v1/invoice", invoiceRoutes);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
};

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        createCategoryDefault();
        routes(app);
        adminDefaultCreated();
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};

