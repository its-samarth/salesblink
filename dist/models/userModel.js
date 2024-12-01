"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const emailSchema = new mongoose_1.default.Schema({
    toEmail: { type: String, required: true },
    subject: { type: String, required: true },
    emailBody: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
    status: { type: String, default: 'Scheduled' }
});
const Email = mongoose_1.default.model('Email', emailSchema);
exports.default = Email;
