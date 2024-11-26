import { Module } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 5000,
        maxRedirects: 5,
        baseURL: configService.get<string>('PHISHING_SIMULATOR_URL')
      }),
      inject: [ConfigService],
    })],
  providers: [PhishingService],
  controllers: [PhishingController],
})
export class PhishingModule {}
