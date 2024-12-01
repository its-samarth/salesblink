// api/schedule-email.ts
import express from 'express';        // Import express
import router from '../routes/emailRoutes';  // Import the router with your routes

const app = express();  // Create an Express app instance
app.use(express.json());  // Middleware to parse incoming JSON requests

// Use the router defined in emailRoutes.ts for handling /api/schedule-email
app.use('/api', router);

// Export this app as a serverless function for Vercel
export default (req:any, res:any) => {
  app(req, res);  // Handle the request using the express app
};
