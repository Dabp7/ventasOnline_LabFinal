import Invoice from "./invoice.model.js";
import User from "../user/user.model.js"


export const getInvoicesByUser = async (req, res) => {
    try {
        const idUser = req.usuario._id;

        
        const invoices = await Invoice.find({ user: idUser }).populate('products.product');

        if (!invoices || invoices.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No invoices found for this user'
            });
        }

        return res.status(200).json({
            success: true,
            invoices
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving invoices',
            error: error.message
        });
    }
};


export const getInvoicesByUserAdmin = async (req, res) => {
    try {
        const { uid } = req.params;
        const admin = req.usuario;

        const user = await User.findById(uid);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        if (user.role === 'ADMIN_ROLE' && admin._id.toString() !== uid) {
            return res.status(403).json({
                success: false,
                message: 'No puedes ver el historial de compras de otro administrador'
            });
        }

        const invoices = await Invoice.find({ user: uid }).populate('products.product');

        if (!invoices || invoices.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No invoices found for this user'
            });
        }

        return res.status(200).json({
            success: true,
            invoices
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Error retrieving invoices',
            error: error.message
        });
    }
};
