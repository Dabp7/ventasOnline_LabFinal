'use strict';

import Products from './products.model.js';
import Category from "../category/category.model.js"

export const addProduct = async(req, res) =>{
    try {
        const data = req.body;
        const category = await Category.findById(data.category)

        if(!category){
            return res.status(400).json({
                success: false,
                message: 'La categoria no existe'
            });
        }

        const products = new Products({
            ...data,
            category: category._id
        });

        await products.save();

        res.status(200).json({
            success: true,
            products,
            category: category.nameCategory
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al crear el producto',
            error: err.message 
        });
    }
}

export const getProducts = async(req, res) =>{
    try{
        const products = await Products.find().sort({ nameProduct: 1 });

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron productos"
            });
        }

        return res.status(200).json({
            success: true,
            total: products.length,
            products
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        });
    }
};

export const searchProduct = async (req, res) => {
    const { idProduct } = req.params;

    try{
        const product = await Products.findById(idProduct);

        if(!product){
            return res.status(404).json({ 
                success: false, 
                message: 'Producto no encontrado' 
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al buscar el producto',
            error
        });
    }
};

export const updateProduct = async(req, res) =>{
    try{
        const { idProduct } = req.params;
        const data = req.body;

        const updateProduct = await Products.findByIdAndUpdate(idProduct, data, { new: true })

        res.status(200).json({
            success: true,
            msg: 'Producto actualizado',
            product: updateProduct
        });


    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el producto',
            error: err.message
        })
    }
};


export const deleteProduct = async(req, res) =>{
    try{
        const { idProduct } = req.params;
        
        await Products.findByIdAndDelete(idProduct);

        res.status(200).json({ 
            success: true,
            message: 'Producto eliminado exitosamente' 
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el producto',
            error: err.message
        });
    }
}



export const getTopProducts = async(req, res) =>{
    try{
        const products = await Products.find().sort({ soldUnits: -1 });

        res.status(200).json({
            success: true,
            total: products.length,
            products
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos más vendidos',
            error: err.message
        });
    }
};


export const getStockProducts = async(req, res) =>{
    try{

        const products = await Products.find({ stock: 0 });


        res.status(200).json({
            success: true,
            total: products.length,
            products
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos agotados',
            error: err.message
        });
    }
};


export const getMostProducts = async(req, res) =>{
    try{
        const products = await Products.find().sort({ stock: -1 });

        res.status(200).json({
            success: true,
            total: products.length,
            products
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos con más stock',
            error: err.message
        });
    }
};

export const getProductsByCategory = async(req, res) =>{
    try{
        const { idCategory } = req.params;
        const products = await Products.find({ category: idCategory });

        if(!products || products.length === 0){
            return res.status(404).json({
                success: false,
                message: "No se encontraron productos en esta categoría"
            });
        }

        res.status(200).json({
            success: true,
            total: products.length,
            products
        });


    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al obtener productos por categoría",
            error: err.message
        });
    }
};


export const getProductsByName = async (req, res) => {
    try {
        const { nameCategory } = req.params;

        const categoryFind = await Category.findOne({ nameCategory });

        if (!categoryFind) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }

        const products = await Products.find({ category: categoryFind._id });

        if (!products.length) {
            return res.status(404).json({
                success: false,
                message: "No hay productos para esta categoría"
            });
        }

        return res.status(200).json({
            success: true,
            total: products.length,
            products
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        });
    }
};

