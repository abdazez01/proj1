const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendVerificationEmail(to:string, code:string) {
    try {
        await transporter.sendMail({
            from: '"Wazen" <verification@Wazen.com>',
            to,
            subject: 'Email Verification',
            text: `Your verification code is ${code}`,
            html: `<p>Your verification code is <b>${code}</b></p>`,
        });
        console.log("doneeeeeeeeeeee");
        return true; 
    } catch (e) {
        console.error('Error sending email:', e);
        return false; 
    }
}

export async function sendRecoveryEmail(to: string, code: string) {
    try {
        await transporter.sendMail({
            from: '"Wazen" <recovery@Wazen.com>',
            to,
            subject: 'Password Recovery',
            text: `Your password recovery code is ${code}`,
            html: `<p>Your password recovery code is <b>${code}</b></p>`,
        });
        console.log("Recovery email sent successfully");
        return true;
    } catch (e) {
        console.error('Error sending recovery email:', e);
        return false;
    }
}


