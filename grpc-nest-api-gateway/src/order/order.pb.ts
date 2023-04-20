/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "order";

/** create order */
export interface CreateOrderRequest {
  productId: number;
  quantity: number;
  userId: number;
  /** campo agregado */
  description: string;
}

export interface CreateOrderResponse {
  status: number;
  error: string[];
  id: number;
}

export const ORDER_PACKAGE_NAME = "order";

export interface OrderServiceClient {
  /**
   * rpc GetOrder(GetOrderRequest) returns (GetOrderResponse);
   * rpc ListOrders(ListOrdersRequest) returns (ListOrdersResponse);
   * rpc UpdateOrder(UpdateOrderRequest) returns (UpdateOrderResponse);
   * rpc DeleteOrder(DeleteOrderRequest) returns (DeleteOrderResponse);
   */

  createOrder(request: CreateOrderRequest): Observable<CreateOrderResponse>;
}

export interface OrderServiceController {
  /**
   * rpc GetOrder(GetOrderRequest) returns (GetOrderResponse);
   * rpc ListOrders(ListOrdersRequest) returns (ListOrdersResponse);
   * rpc UpdateOrder(UpdateOrderRequest) returns (UpdateOrderResponse);
   * rpc DeleteOrder(DeleteOrderRequest) returns (DeleteOrderResponse);
   */

  createOrder(
    request: CreateOrderRequest,
  ): Promise<CreateOrderResponse> | Observable<CreateOrderResponse> | CreateOrderResponse;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_SERVICE_NAME = "OrderService";
