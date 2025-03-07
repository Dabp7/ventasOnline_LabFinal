import fs from 'fs';
import path from 'path';
import pdfkit from 'pdfkit';
import Invoice from "../invoice/invoice.model.js";
import Cart from "../cart/cart.model.js";
import Product from "../products/products.model.js";
import User from "../user/user.model.js";

export const generateInvoice = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.usuario._id }).populate("products.product");

        if(!cart || cart.products.length === 0){
            return res.status(400).json({
                success: false,
                message: "Cart not found"
            })
        }

        let total = 0;
        const productsBuy = [];

        for(const item of cart.products){
            const product = item.product;
            if(product.stock < item.quantity){
                return res.status(400).json({
                    success: false,
                    message: `There are few units available for the product ${product.nameProduct}`
                })
            }
            product.soldUnits += item.quantity;
            await product.save();

            const productTotal = product.price * item.quantity;
            total += productTotal;
            productsBuy.push({
                product: product._id,
                nameProduct: product.nameProduct,
                quantity: item.quantity,
                price: product.price,
                totalProduct: productTotal
            });
        }

        const invoice = new Invoice({
            user: req.usuario._id,
            products: productsBuy,
            total,
            date: new Date()
        });

        await invoice.save();

        cart.products = [];
        await cart.save();

        const invoiceDir = path.join(__dirname, "../../public/docs/invoice");
        if (!fs.existsSync(invoiceDir)) {
            fs.mkdirSync(invoiceDir, { recursive: true });
        }

        const dateStr = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${dateStr}-${user.username}.pdf`;
        const filePath = path.join(invoiceDir, fileName);

        const doc = new pdfkit();
        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(20).text('Invoice', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`User: ${user.username}`);
        doc.text(`Date: ${new Date().toLocaleString()}`);
        doc.text(`Total: $${total.toFixed(2)}`);
        doc.moveDown();

        doc.fontSize(12).text('Products:');
        cart.products.forEach(item => {
            doc.text(`${item.quantity}x ${item.product.nameProduct} - $${item.product.price} each - Total: $${(item.quantity * item.product.price).toFixed(2)}`);
        });

        doc.end();

        return res.status(200).json({
            success: true,
            message: "Purchase completed, invoice generated",
            invoice,
            pdfPath: filePath
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error generating invoice",
            error: error.message
        });
    }
};
