'use strict';

import Category from './category.model.js';

export const addCategory = async (req, res) => {
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

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la categoria',
            error: err.message 
        });
    }
}

export const getCategory = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = {};

    try {
        const category = await Category.find(query) 
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Category.countDocuments(query); 

        res.status(200).json({
            success: true,
            total,
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las categorias',
            error
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { idCategory } = req.params;
        const  data  = req.body;

        const category = await Category.findByIdAndUpdate(idCategory, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Categoria Actualizada',
            category,
        });
    } catch (err) {
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
        
        await Category.findByIdAndDelete(idCategory);

        res.status(200).json({ 
            success: true,
            message: 'Categoria eliminada exitosamente' 
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la categoria',
            error: err.message
        });
    }
}

