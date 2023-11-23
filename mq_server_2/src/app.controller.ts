import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Request/Response
  @Post('send-message')
  async sendMessage(@Body('message') message: string): Promise<any> {
    return await this.appService.sendMessage(message);
  }

  // Pub/Sub
  @Post('publish-message')
  async publishMessage(
    @Body('message') message: string,
  ): Promise<{ status: string }> {
    return await this.appService.publishMessage(message);
  }

  // RPC
  @Post('get-sum')
  async getSum(
    @Body('num_a') a: number,
    @Body('num_b') b: number,
  ): Promise<{ result: number }> {
    return await this.appService.getSum(a, b);
  }
}
