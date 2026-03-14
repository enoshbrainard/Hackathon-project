import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { MongoMemoryServer } from 'mongodb-memory-server';
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;

const connectDB=async()=>{
    try{
        mongoose.connection.on("connected",()=>{
            console.log("Database connected successfully");
        });
        
        // Start MongoMemoryServer to ensure we have a working DB for the hackathon
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        console.log(`Starting in-memory database at ${mongoUri}`);
        await mongoose.connect(mongoUri, { dbName: "smartwinnr" });
        
        // Seed default dummy data
        const count = await Category.countDocuments();
        if (count === 0) {
            const bcrypt = await import("bcryptjs");
            const salt = await bcrypt.default.genSalt(10);
            const hashedAdminPassword = await bcrypt.default.hash("admin123", salt);

            await import("./models/User.js").then(async (m) => {
                const User = m.default;
                await User.insertMany([{
                    name: "Admin User",
                    email: "admin@quickbite.com",
                    password: hashedAdminPassword,
                    role: "admin"
                }]);
            });

            const categories = await Category.insertMany([
                { name: 'Deals', icon: '🔥' },
                { name: 'Burgers', icon: '🍔' },
                { name: 'Chicken', icon: '🍗' },
                { name: 'Beverages', icon: '🥤' },
                { name: 'Desserts', icon: '🍦' },
                { name: 'Sides', icon: '🍟' },
                { name: 'Combos', icon: '🍱' }
            ]);
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
            console.log("Database seeded with sample products & categories");
        }
    }catch(error){
        console.error("Database connection failed:", error);
    }
}

connectDB();
app.get("/",(req,res)=>{
    res.send("Backend API is running...");
})
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
const PORT=process.env.PORT||5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});