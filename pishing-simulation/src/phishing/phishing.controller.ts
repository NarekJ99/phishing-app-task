import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePhishingDto } from './dto/createPhishing.dto';
import { PhishingService } from './phishing.service';
import { PhishingClickDto } from './dto/clickPhishing.dto';

@Controller('phishing')
export class PhishingController {
  constructor(
    private readonly phishingService: PhishingService,
  ) { }

  @Post('send')
  async sendEmail(@Body() sendPhishingDto: CreatePhishingDto) {
    return this.phishingService.sendPhishingEmail(sendPhishingDto);
  }
  
  @Get('click')
  async phishingClick(@Query() query: PhishingClickDto) {
      return this.phishingService.handlePhishingClick(query);
  }

  @Get('all/:userId')
  async getAll(@Param('userId') userId:string){
    return this.phishingService.getAll(userId)
  }
}
