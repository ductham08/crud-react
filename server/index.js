import express from "express"
import cors from "cors"
import dotenv from 'dotenv'

import connectDB from "./config/database.js";
import userRouter from "./apis/routers/user.js"

dotenv.config();
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the CRUD API' });
});

// API Routes
app.use('/api/users', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 