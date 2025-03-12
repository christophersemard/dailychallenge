import { RpcException } from "@nestjs/microservices";

export function handleRpcError(message: string, statusCode: number) {
    throw new RpcException({ statusCode, message });
}
