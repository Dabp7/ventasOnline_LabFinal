import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/user/user.routes.js';
import categoryRoutes from '../src/category/category.routes.js';
import productRoutes from '../src/products/products.routes.js';
import cartRoutes from '../src/cart/cart.routes.js';
import buyRoutes from '../src/buys/buys.routes.js';
import invoiceRoutes from '../src/invoice/invoice.routes.js';
import { swaggerDocs, swaggerUi } from './swagger.js';

export function createApp() {
    const app = express();
    app.use(express.json({ limit: '128kb' }), cors(), helmet(), morgan('dev'));
    app.get('/health', (_req, res) => res.json({ status: 'ok' }));
    for (const [name, router] of Object.entries({auth: authRoutes, user: userRoutes, category: categoryRoutes, product: productRoutes, cart: cartRoutes, buy: buyRoutes, invoice: invoiceRoutes})) app.use('/ventaOnline/v1/' + name, router);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.get('/openapi.json', (_req, res) => res.json(swaggerDocs));
    return app;
}
export async function initServer() {
    if (!process.env.SECRETORPRIVATEKEY || process.env.SECRETORPRIVATEKEY.length < 32) throw new Error('SECRETORPRIVATEKEY must have at least 32 characters');
    await dbConnection();
    return createApp().listen(Number(process.env.PORT || 3001), '127.0.0.1', () => console.log('Ventas Online ready'));
}
