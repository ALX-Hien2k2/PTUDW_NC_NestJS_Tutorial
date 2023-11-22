import { Controller } from '@nestjs/common';
import { MathService } from './math.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Sum2IntReq, Sum2IntRes } from 'src/proto/math.pb';

@Controller()
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @GrpcMethod('MathService', 'Sum2Int')
  Sum(data: Sum2IntReq): Sum2IntRes {
    return {
      sum: data.a + data.b,
    };
  }
}
