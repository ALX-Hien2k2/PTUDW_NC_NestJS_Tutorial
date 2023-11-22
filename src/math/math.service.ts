import { Injectable } from '@nestjs/common';
import {
  ClientGrpc,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  MATH_PACKAGE_NAME,
  MATH_SERVICE_NAME,
  MathServiceClient,
  Sum2IntReq,
  Sum2IntRes,
} from 'src/proto/math.pb';

@Injectable()
export class MathService {
  private readonly grpcClient: ClientGrpc;
  private readonly mathServiceClient: MathServiceClient;
  constructor() {
    this.grpcClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        package: MATH_PACKAGE_NAME,
        protoPath: 'src/proto/math.proto',
        url: '0.0.0.0:9000',
      },
    });
    this.mathServiceClient =
      this.grpcClient.getService<MathServiceClient>(MATH_SERVICE_NAME);
  }

  sum(data: Sum2IntReq): Observable<Sum2IntRes> {
    return this.mathServiceClient.sum2Int(data);
  }
}
