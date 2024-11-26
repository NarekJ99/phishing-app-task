import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASSWORD'),
            },
        });
    }

    async sendMail(to: string, subject: string, text: string, html?: string): Promise<any> {
        const mailOptions = {
            from: this.configService.get<string>('EMAIL_USER'),
            to,
            subject,
            text,
            html,
        };

        try {
            console.log(mailOptions)
            return await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }
}
