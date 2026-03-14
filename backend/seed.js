import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoMemoryServer } from 'mongodb-memory-server';
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import fs from "fs";

dotenv.config();

const seedData = async () => {
    try {
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        
        fs.writeFileSync(".env.local", `MONGO_URI=${mongoUri}`);
        console.log(`Memory server started at ${mongoUri}`);

        await mongoose.connect(mongoUri, { dbName: "smartwinnr" });
        console.log("Database connected successfully");

        await Category.deleteMany();
        await Product.deleteMany();

        const categories = await Category.insertMany([
            { name: 'Deals', icon: '🔥' },
            { name: 'Burgers', icon: '🍔' },
            { name: 'Chicken', icon: '🍗' },
            { name: 'Beverages', icon: '🥤' },
            { name: 'Desserts', icon: '🍦' },
            { name: 'Sides', icon: '🍟' },
            { name: 'Combos', icon: '🍱' }
        ]);

        console.log("Categories seeded");

        const burgersId = categories.find(c => c.name === 'Burgers')._id;
        const chickenId = categories.find(c => c.name === 'Chicken')._id;

        await Product.insertMany([
            { title: 'Double Cheese Burger', price: 5.99, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80', description: 'Two 100% beef patties with cheese, onions, and signature sauce.', category: burgersId, stock: 100 },
            { title: 'Spicy Chicken Sandwich', price: 4.99, imageUrl: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=500&q=80', description: 'Crispy chicken breast with spicy mayo and fresh lettuce.', category: chickenId, stock: 50 },
            { title: 'Bacon Crunch Burger', price: 6.49, imageUrl: 'https://images.unsplash.com/photo-1594212752834-3158c5483250?auto=format&fit=crop&w=500&q=80', description: 'Topped with crispy smoked bacon and cheddar cheese.', category: burgersId, stock: 40 },
            { title: 'Veggie Delight', price: 4.49, imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80', description: 'Plant-based patty with fresh veggies and vegan mayo.', category: burgersId, stock: 20 },
            { title: 'Classic Burger', price: 3.99, imageUrl: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=500&q=80', description: 'Our original, beloved classic recipe passed down for years.', category: burgersId, stock: 100 },
            { title: 'Mushroom Swiss', price: 5.49, imageUrl: 'https://images.unsplash.com/photo-1621360841013-c76831ef5bc3?auto=format&fit=crop&w=500&q=80', description: 'Loaded with sautéed portobello mushrooms and swiss cheese.', category: burgersId, stock: 30 },
        ]);

        console.log("Products seeded");

        console.log("Keep this process running to keep the database alive for the backend!");
        // We do not close the connection so the backend can use this DB.
    } catch (err) {
        console.error("Error seeding data:", err);
    }
}

seedData();
