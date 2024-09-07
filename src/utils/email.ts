import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const sendConfirmationEmail = async (
    toEmail: string,
    subject: string,
    text: string,
): Promise<SMTPTransport.SentMessageInfo> => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'abinvarghese273@gmail.com',
            pass: 'rpih sgvo uxme sqnl',
        },
        connectionTimeout: 10000,
    });

    const mailOptions = {
        from: 'innobyteAuthApp abinvarghese273@gmail.com',
        to: toEmail,
        subject: subject,
        text: text,
        html: `
		<h3> Innobyte Registration confirmation</h3><br/>
		<p> You successfully registered to innobyte auth application.</p>
	  `,
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
};
