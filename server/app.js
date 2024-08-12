const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const dotenv = require('dotenv');

// Load environment variables
// dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const authRouter=require("./routes/authRoutes")

// Middleware
app.use(cors({ 
  origin: "http://localhost:3000",
}));
app.use(express.json());

// Routes
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use("/auth",authRouter)

// Connect to MongoDB using environment variable
mongoose.connect("mongodb://mongodb:27017/carwash")
.then(() => {
  console.log("Connected to database");
})
.catch((err) => {
  console.log("Failed to connect to database", err);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
