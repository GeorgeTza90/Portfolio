import * as dotenv from "dotenv";
import nodemailer, { Transporter, SentMessageInfo } from "nodemailer";

dotenv.config();

async function MailMe(
    from: string,
    to: string,
    subject: string,
    text: string
): Promise<SentMessageInfo | undefined> {
    try {
        const transporter: Transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: process.env.SMTP_USER || "",
                pass: process.env.SMTP_PASS || ""
            }
        });

        const info = await transporter.sendMail({
            from,
            to,
            subject,
            text
        });

        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        return undefined;
    }
}

export default MailMe;
