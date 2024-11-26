import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SendEmailDto } from './dto/sendEmail.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PhishingService {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  async getAll(user) {
    try {

      console.log(user)

      const response = await firstValueFrom(
        this.httpService.get(`/phishing/all/${user.userId}`),
      );

      return response.data;
    }
    catch (error) {

      console.log(JSON.stringify(error))

      if (error.response && error.response.status === 404) {
        throw new BadRequestException('No phishing data found for this user');
      }

      if (error.response && error.response.status === 400) {
        throw new BadRequestException('Bad request while fetching phishing data');
      }

      throw new InternalServerErrorException('Failed to fetch phishing data. Please try again later.');
    }
  }

  async sendEmail(dto: SendEmailDto, user) {
    try {
      const { email } = dto;

      const response = await firstValueFrom(
        this.httpService.post(`/phishing/send`, {
          email,
          userId: user.userId,
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      throw error;
    }
  }
}
