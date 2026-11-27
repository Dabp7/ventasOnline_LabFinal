import mongoose from 'mongoose';
import Invoice from '../invoice/invoice.model.js';
import Cart from '../cart/cart.model.js';
import Product from '../products/products.model.js';
import { fail, respondError } from '../helpers/domain-error.js';

export const generateInvoice = async (req, res) => {
    try {
        let invoice;
        await mongoose.connection.transaction(async session => {
            const cart = await Cart.findOne({ user: req.usuario._id }).session(session);
            if (!cart || cart.products.length === 0) fail(409, 'Cart is empty');
            let totalMinor = 0;
            const products = [];
            for (const item of cart.products) {
                if (!Number.isSafeInteger(item.quantity) || item.quantity <= 0) fail(409, 'Invalid cart quantity');
                const product = await Product.findOneAndUpdate(
                    { _id: item.product, stock: { $gte: item.quantity } },
                    { $inc: { stock: -item.quantity, soldUnits: item.quantity } },
                    { new: true, session, runValidators: true },
                );
                if (!product) fail(409, 'Product unavailable or insufficient stock');
                const priceMinor = Math.round(product.price * 100);
                const lineMinor = priceMinor * item.quantity;
                if (!Number.isSafeInteger(lineMinor) || lineMinor < 0 || !Number.isSafeInteger(totalMinor + lineMinor)) fail(409, 'Invalid monetary amount');
                totalMinor += lineMinor;
                products.push({ product: product._id, nameProduct: product.nameProduct, quantity: item.quantity, price: priceMinor / 100, totalProduct: lineMinor / 100 });
            }
            [invoice] = await Invoice.create([{ user: req.usuario._id, products, total: totalMinor / 100 }], { session });
            cart.products = [];
            await cart.save({ session });
        });
        return res.json({ success: true, message: 'Purchase completed', invoice, pdfPath: '/ventaOnline/v1/invoice/' + invoice.id + '/pdf' });
    } catch (error) { return respondError(res, error); }
};
