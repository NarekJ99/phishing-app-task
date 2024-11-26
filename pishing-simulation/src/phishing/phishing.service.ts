import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { CreatePhishingDto } from './dto/createPhishing.dto';
import { PhishingRecords, PhishingStatus, PhishingType } from 'src/schemas/Phishing.model';
import { PhishingClickDto } from './dto/clickPhishing.dto';

@Injectable()
export class PhishingService {
    constructor(
        @InjectModel(PhishingRecords.name)
        private readonly phishingModel: Model<PhishingType>,
        private readonly emailService: MailService,
        private configService: ConfigService,
    ) { }

    async sendPhishingEmail(dto: CreatePhishingDto) {
        const { email, userId } = dto;

        const existingPhishingAttempt = await this.phishingModel.findOne({ email }).exec();
        if (existingPhishingAttempt) {
            throw new BadRequestException('Phishing email already sent to this address');
        }

        const appUrl = this.configService.get<string>('APP_URL');
        const url = `${appUrl}/phishing/click?email=${email}`;
        const htmlContent = this.createPhishingEmailContent(url);
        const subject = 'Phishing attempt - Simulated';

        try {
            await this.emailService.sendMail(email, subject, undefined, htmlContent);
        } catch (error) {
            throw new BadRequestException('Failed to send phishing email');
        }

        const newPhishingAttempt = new this.phishingModel({
            email,
            status: PhishingStatus.PENDING,
            content: htmlContent,
            createdBy: userId
        });

        await newPhishingAttempt.save();

        return {
            message: 'Phishing email sent successfully.',
            email,
            status: newPhishingAttempt.status,
        };
    }

    async handlePhishingClick(dto: PhishingClickDto) {
        const { email } = dto;

        try {
            const phishingRecord = await this.phishingModel.findOne({ email }).exec();
            if (!phishingRecord) {
                throw new BadRequestException('No phishing attempt found for this email');
            }

            phishingRecord.status = PhishingStatus.COMPLETED;
            await phishingRecord.save();

            return {
                message: 'Phishing status updated to CLICKED',
                email,
                status: phishingRecord.status
            };
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getAll(userId: string) {
        try {

            console.log(userId)
            return await this.phishingModel.find({ createdBy: userId }).exec();
        }
        catch (error) {
            throw error;
        }
    }

    private createPhishingEmailContent(url: string): string {
        return `<p>This is a phishing attempt. Click <a href="${url}">here</a> to check the result.</p>`;
    }
}
