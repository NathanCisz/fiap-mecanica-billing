import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { IMessagingPort } from '../../application/ports/messaging.port';

@Injectable()
export class RabbitMQService
  implements IMessagingPort, OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(RabbitMQService.name);
  private connection: any;
  private channel: any;

  async onModuleInit() {
    try {
      const amqplib = require('amqplib');
      const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
      this.connection = await amqplib.connect(url);
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange('billing', 'topic', { durable: true });
      this.logger.log('RabbitMQ connected');
    } catch (error) {
      this.logger.warn('RabbitMQ not available, messaging disabled');
    }
  }

  async onModuleDestroy() {
    try {
      await this.channel?.close();
      await this.connection?.close();
    } catch {}
  }

  async publish(
    exchange: string,
    routingKey: string,
    message: object,
  ): Promise<void> {
    try {
      if (!this.channel) return;
      this.channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(message)),
        { persistent: true },
      );
      this.logger.log(`Published ${routingKey}`);
    } catch (error) {
      this.logger.error(`Failed to publish ${routingKey}`, error);
    }
  }
}
