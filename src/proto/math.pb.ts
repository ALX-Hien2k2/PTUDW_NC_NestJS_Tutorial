/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "math";

export interface Sum2IntReq {
  a: number;
  b: number;
}

export interface Sum2IntRes {
  sum: number;
}

export const MATH_PACKAGE_NAME = "math";

export interface MathServiceClient {
  sum2Int(request: Sum2IntReq): Observable<Sum2IntRes>;
}

export interface MathServiceController {
  sum2Int(request: Sum2IntReq): Promise<Sum2IntRes> | Observable<Sum2IntRes> | Sum2IntRes;
}

export function MathServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sum2Int"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MathService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MathService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MATH_SERVICE_NAME = "MathService";
