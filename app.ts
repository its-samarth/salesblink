import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/emailRoutes';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', router);


// Enable direct connection in Mongoose
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected  y');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

export default app;