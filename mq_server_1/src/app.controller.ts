import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  // Request/response
  @MessagePattern({ cmd: 'message_pattern' })
  async handleMessageReqRes(@Payload() data: any): Promise<any> {
    console.log('Server 1, Receive msg:', data);

    // return 'Hello from server 1, Received msg: ' + data;

    return {
      message: 'Hello from server 1, Received msg: ' + data,
    };
  }

  // Pub/sub
  @EventPattern('pubsub_pattern')
  async handleMessagePubSub_1(data: any): Promise<void> {
    console.log('Server 1 Pub/sub_1, Received msg:', data);
  }

  @EventPattern('pubsub_pattern')
  async handleMessagePubSub_2(data: any): Promise<void> {
    console.log('Server 1 Pub/sub_2, Received msg:', data);
  }

  // RPC
  @MessagePattern({ cmd: 'get_sum_pattern' })
  async getSum(@Payload() data: { a: number; b: number }): Promise<number> {
    console.log('Server 1, Receive data:', data);

    const result = data.a + data.b;

    console.log('Server 1, Send data', result);

    return result;
  }
}
