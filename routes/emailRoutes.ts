import express from 'express';
import { scheduleEmail } from '../controllers/emailController';
const router = express.Router();

router.post('/schedule-email', (req, res, next) => {
  const { to, subject, body, when } = req.body;
  scheduleEmail(to, subject, body, when)
	.then(result => res.status(200).json(result))
	.catch(next);
});  // Endpoint for scheduling email

export default router;
