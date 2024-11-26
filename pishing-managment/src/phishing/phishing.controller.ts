import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { UserDocument } from 'src/schemas/User.model';
import { SendEmailDto } from './dto/sendEmail.dto';

@UseGuards(JwtAuthGuard)
@Controller('phishing')
export class PhishingController {
  constructor(private phishingService: PhishingService) { }

  @Get('')
  async getAll(@User() user: UserDocument) {
    return this.phishingService.getAll(user);
  }

  @Post('')
  async sendEmail(@Body() dto: SendEmailDto, @User() user: UserDocument) {
    return this.phishingService.sendEmail(dto, user)
  }
}
