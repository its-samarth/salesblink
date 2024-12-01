"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const agenda_1 = __importDefault(require("agenda"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailerConfig_1 = __importDefault(require("../utils/nodemailerConfig"));
const agenda = new agenda_1.default({ db: { address: process.env.MONGO_URI } });
agenda.define('send email', async (job) => {
    const { email, subject, body } = job.attrs.data;
    const transporter = nodemailer_1.default.createTransport(nodemailerConfig_1.default);
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: body,
    });
    console.log(`Email sent to ${email}`);
});
(async () => {
    await agenda.start();
})();
exports.default = agenda;
