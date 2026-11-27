import mongoose from 'mongoose';
import Product from '../products/products.model.js';
import Cart from './cart.model.js';
import { fail, respondError } from '../helpers/domain-error.js';

export const addProductCart = async (req, res) => {
    const { nameProduct, quantity } = req.body;
    if (!Number.isSafeInteger(quantity) || quantity < 1) return res.status(400).json({ success: false, message: 'quantity must be a positive integer' });
    try {
        let shoppingCart;
        await mongoose.connection.transaction(async session => {
            const product = await Product.findOne({ nameProduct }).session(session);
            if (!product) fail(404, 'Product not found');
            let cart = await Cart.findOne({ user: req.usuario._id }).session(session);
            if (!cart) cart = new Cart({ user: req.usuario._id, products: [] });
            const line = cart.products.find(item => item.product.equals(product._id));
            const desired = (line?.quantity ?? 0) + quantity;
            if (!Number.isSafeInteger(desired) || desired > product.stock) fail(409, 'Product out of stock');
            if (line) line.quantity = desired;
            else cart.products.push({ product: product._id, quantity });
            shoppingCart = await cart.save({ session });
        });
        return res.json({ success: true, message: 'Product added. Stock is committed at checkout.', shoppingCart });
    } catch (error) { return respondError(res, error); }
};

export const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.usuario._id }).populate('products.product');
        return res.json({ success: true, cart: cart ?? [] });
    } catch (error) { return respondError(res, error); }
};

export const removeProduct = async (req, res) => {
    const { quantity } = req.body;
    if (!Number.isSafeInteger(quantity) || quantity < 1) return res.status(400).json({ success: false, message: 'quantity must be a positive integer' });
    try {
        let cart;
        await mongoose.connection.transaction(async session => {
            cart = await Cart.findOne({ user: req.usuario._id }).session(session);
            if (!cart) fail(404, 'Cart not found');
            const index = cart.products.findIndex(item => item.product.toString() === req.params.idProduct);
            if (index < 0) fail(404, 'Product not found in cart');
            if (quantity >= cart.products[index].quantity) cart.products.splice(index, 1);
            else cart.products[index].quantity -= quantity;
            await cart.save({ session });
        });
        return res.json({ success: true, cart });
    } catch (error) { return respondError(res, error); }
};
