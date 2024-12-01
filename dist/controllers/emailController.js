"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const agenda_1 = __importDefault(require("agenda"));
// Create transporter using Nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password (use App password if 2FA is enabled)
    },
});
// Test the transporter
transporter.verify((error, success) => {
    if (error) {
        console.error('Error verifying transporter:', error);
    }
    else {
        console.log('Transporter is ready to send emails');
    }
});
const mongoURI = process.env.MONGO_URI; // MongoDB URI
const agenda = new agenda_1.default({
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
agenda.define('send-email', async (job) => {
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
    }
    catch (error) {
        console.error('Error while sending email:', error);
        throw error; // Re-throw error to allow retries
    }
});
// Exported function for scheduling emails
const scheduleEmail = async (to, subject, body, when) => {
    try {
        const job = await agenda.schedule(when, 'send-email', { to, subject, body });
        console.log('Job scheduled successfully:', job.attrs);
        return job.attrs;
    }
    catch (error) {
        console.error('Error scheduling email:', error);
        throw error;
    }
};
exports.scheduleEmail = scheduleEmail;
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
