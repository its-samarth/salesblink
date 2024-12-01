import nodemailer from 'nodemailer';
import 'dotenv/config';
import Agenda from 'agenda';

// Create transporter using Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587, // or 465 for SSL
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password (use App password if 2FA is enabled)
  },
});

// Test the transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('Error verifying transporter:', error);
  } else {
    console.log('Transporter is ready to send emails');
  }
});

const mongoURI = process.env.MONGO_URI as string; // MongoDB URI
const agenda = new Agenda({
  db: {
    address: mongoURI,
    collection: 'jobs', // Collection name for scheduled jobs
  },
});

// Log when Agenda is ready
agenda.on('ready', () => {
  console.log('Agenda connected and ready to accept jobs');
});

// Log Agenda errors
agenda.on('error', (err) => {
  console.error('Agenda error:', err);
});

// Start Agenda
(async () => {
  await agenda.start();
})();

// Define the "send-email" job
agenda.define('send-email', async (job: { attrs: { data: { to: string; subject: string; body: string } } }) => {
  const { to, subject, body } = job.attrs.data;
  console.log('Executing "send-email" job with data:', { to, subject, body });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
    });

    console.log('Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error while sending email:', error);
    throw error; // Re-throw error to allow retries
  }
});

// Exported function for scheduling emails
export const scheduleEmail = async (to: string, subject: string, body: string, when: string) => {
  try {
    const job = await agenda.schedule(when, 'send-email', { to, subject, body });
    console.log('Job scheduled successfully:', job.attrs);
    return job.attrs;
  } catch (error) {
    console.error('Error scheduling email:', error);
    throw error;
  }
};

// // Example usage (optional)
// // Remove this section when integrating elsewhere
// (async () => {
//   try {
//     const scheduledJob = await scheduleEmail(
//       'samarthkasma21@gmail.com',
//       'Hello from Agenda!',
//       'This email was scheduled programmatically.',
//       'in 1 minute' // Schedule for 1 minute later
//     );

//     console.log('Scheduled job details:', scheduledJob);
//   } catch (error) {
//     console.error('Error in scheduling example:', error);
//   }
// })();
