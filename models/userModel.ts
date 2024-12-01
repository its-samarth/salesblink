import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
    toEmail: { type: String, required: true },
    subject: { type: String, required: true },
    emailBody: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
    status: { type: String, default: 'Scheduled' }
});

const Email = mongoose.model('Email', emailSchema);

export default Email;
