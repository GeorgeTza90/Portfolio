require("dotenv").config();
const nodemailer = require("nodemailer");

async function MailMe(from, to, subject, text) {
    try {        
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const info = await transporter.sendMail({
            from,
            to,
            subject,
            text,
        });

        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

        return info; 
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = MailMe;
