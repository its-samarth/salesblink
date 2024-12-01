import Agenda from 'agenda';
import nodemailer from 'nodemailer';
import nodemailerConfig from '../utils/nodemailerConfig';

const agenda = new Agenda({ db: { address: process.env.MONGO_URI! } });

agenda.define('send email', async (job: any) => {
  const { email, subject, body } = job.attrs.data;

  const transporter = nodemailer.createTransport(nodemailerConfig);
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

export default agenda;
