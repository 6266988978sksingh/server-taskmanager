import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // Server ko exit karne ke liye (agar connection fail ho jaye)
    }
};

export const createJWT = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  
    // Change sameSite from strict to none when you deploy your app
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict", //prevent CSRF attack
      maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
    });
  };


