'use strict';

import Category from './category.model.js';
import Product from "../products/products.model.js"

export const createCategoryDefault = async(req, res) =>{
    
    try{
        const defaultCategory = await Category.findOne({ nameCategory: "Categoria Predeterminada" });

        if(!defaultCategory){
            const category = new Category({
                nameCategory: "Categoria Predeterminada",
                description: "Categoria para productos sin categoria"
            });
        
            await category.save();
        }

    }catch(err){
        return res.status(500).json({
            message: "Error al crear la categoria general",
            error: err.message
        });
    }
    
}

export const addCategory = async(req, res) =>{
    try {
        const data = req.body;

        const category = new Category({
            ...data,
        });

        await category.save();

        res.status(200).json({
            success: true,
            category
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al crear la categoria',
            error: err.message 
        });
    }
}

export const getCategory = async(req, res) =>{
    const { limite = 10, desde = 0 } = req.query;
    const query = {};

    try{
        const category = await Category.find(query) 
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Category.countDocuments(query); 

        res.status(200).json({
            success: true,
            total,
            category
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al obtener las categorias',
            error
        });
    }
}

export const updateCategory = async(req, res) =>{
    try{
        const { idCategory } = req.params;
        const  data  = req.body;

        const category = await Category.findByIdAndUpdate(idCategory, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Categoria Actualizada',
            category,
        });
    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la categoria',
            error: err.message
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { idCategory } = req.params;
        const defaultCategory = await Category.findOne({ nameCategory: "Categoria Predeterminada" });

        if (!defaultCategory) {
            return res.status(400).json({
                success: false,
                message: "No se encontró la categoría por defecto"
            });
        }

        await Product.updateMany({ category: idCategory }, { category: defaultCategory._id });
        await Category.findByIdAndDelete(idCategory);

        res.status(200).json({
            success: true,
            message: 'Categoría eliminada exitosamente y productos reasignados'
        });
    }catch (err){
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la categoría',
            error: err.message
        });
    }
};

