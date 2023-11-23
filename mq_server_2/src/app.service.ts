import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'test_queue',
        noAck: true,
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  // Request/response
  async sendMessage(message: string): Promise<any> {
    console.log('Server 2, Send msg: ', message);

    const response = await this.client
      .send<any>({ cmd: 'message_pattern' }, message)
      .toPromise();

    console.log('Server 2, Receive response: ', response);

    return response;
  }

  // Pub/sub
  async publishMessage(message: string) {
    try {
      console.log('Server 2, Publishing message:', message);

      await this.client.emit('pubsub_pattern', message).toPromise();

      return {
        status: 'success',
      };
    } catch (err) {
      console.log('Server 2, Error publishing message:', err);
      throw new Error(err);
    }
  }

  // RPC
  async getSum(a: number, b: number): Promise<{ result: number }> {
    console.log('Server 2 (RPC), Send data: ', { a, b });

    const result = await this.client
      .send<number, { a: number; b: number }>(
        { cmd: 'get_sum_pattern' },
        { a, b },
      )
      .toPromise();

    console.log('Server 2, Receive data: ', result);

    return { result };
  }
}
