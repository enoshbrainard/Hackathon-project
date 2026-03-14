import Category from "../models/Category.js";

export const createCategory = async (req, res) => {

    try {

        const { name, logo, description } = req.body;

        const category = new Category({
            name,
            logo,
            description
        });

        await category.save();

        res.status(201).json(category);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};

export const getCategories = async (req, res) => {

    try {

        const categories = await Category.find();

        res.json(categories);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }
};