//send mail using nodemailer with google smtp
import nodemailer from "nodemailer";
const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text,
  });
};
sendMail(
  "chaudharymuskan94@gmail.com",
  "Test Subject",
  "This is a test email."
);
export default sendMail;
