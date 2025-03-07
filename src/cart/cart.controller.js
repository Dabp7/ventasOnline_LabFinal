
import Product from "../products/products.model.js"
import Cart from "./cart.model.js"

export const addProductCart = async(req, res) =>{
    try{
        const { nameProduct, quantity } = req.body;

        const product = await Product.findOne({ nameProduct });

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        }

        if (quantity > product.stock) {
            return res.status(400).json({
                success: false,
                message: "Product out of stock"
            });
        }

        let cart = await Cart.findOne({ user: req.usuario._id });

        if (!cart) {
            cart = new Cart({ user: req.usuario._id, products: [] });
        }

        const productExist = cart.products.find(p => p.product.toString() === product._id.toString());

        if (productExist) {
            productExist.quantity += quantity;
        } else {
            cart.products.push({ product: product._id, quantity });
        }

        product.stock -= quantity;
        await product.save(); 

        const shoppingCart = await cart.save(); 

        return res.status(200).json({
            success: true,
            message: "Product added to cart",
            shoppingCart
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error adding product to cart",
            error: err.message
        });
    }
};


export const getUserCart = async(req, res) =>{
    try {
        const cart = await Cart.findOne({ user: req.usuario._id }).populate('products.product');

        if (!cart || cart.products.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Your cart is empty",
                cart: []
            });
        }

        return res.status(200).json({
            success: true,
            cart
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error fetching cart",
            error: error.message
        });
    }
};


export const removeProduct = async (req, res) => {
    try {
        const { idProduct } = req.params;
        const { quantity } = req.body; 

        const cart = await Cart.findOne({ user: req.usuario._id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === idProduct);

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        const productInCart = cart.products[productIndex];

        if(quantity >= productInCart.quantity) {
            cart.products.splice(productIndex, 1);
        } else {
            productInCart.quantity -= quantity;
        }

        const product = await Product.findById(idProduct);

        if (product) {
            product.stock += quantity;
            await product.save();
        }

        if (cart.products.length === 0) {
            await Cart.findOneAndDelete({ user: req.usuario._id });
            return res.status(200).json({
                success: true,
                message: "Product removed and cart deleted since it was empty"
            });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product removed",
            cart
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error removing product from cart",
            error: error.message
        });
    }
};


