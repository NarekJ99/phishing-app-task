import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { MailModule } from 'src/mail/mail.module';
import { PhishingRecords, PhishingSchema } from 'src/schemas/Phishing.model';

@Module({
  imports: [MailModule, MongooseModule.forFeature([{ name: PhishingRecords.name, schema: PhishingSchema }])],
  controllers: [PhishingController],
  providers: [PhishingService],
})
export class PishingModule {}
