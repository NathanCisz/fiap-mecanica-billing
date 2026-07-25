import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { IMessagingPort } from '../../application/ports/messaging.port';
export declare class RabbitMQService implements IMessagingPort, OnModuleInit, OnModuleDestroy {
    private readonly logger;
    private connection;
    private channel;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    publish(exchange: string, routingKey: string, message: object): Promise<void>;
}
