import { Router } from 'express';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: 'Too many messages sent. Please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const router = Router();

router.post('/', limiter, async (req, res) => {
    const { name, email, message, phone } = req.body;
    if (phone?.trim()) return res.redirect('/contact?sent=1');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `ePortfolio contact from ${name}`,
            text: message,
        });
        res.redirect('/contact?sent=1');
    } catch (err) {
        console.error(err);
        res.redirect('/contact?sent=0');
    }
});

export default router;
