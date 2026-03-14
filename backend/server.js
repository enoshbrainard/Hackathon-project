import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
const MONGO_URL=process.env.MONGO_URL;
const connectDB=async()=>{
    try{
        mongoose.connection.on("connected",()=>{
            console.log("Database connected successfully");
        });
        await mongoose.connect(`${MONGO_URL}/smartwinnr`);
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