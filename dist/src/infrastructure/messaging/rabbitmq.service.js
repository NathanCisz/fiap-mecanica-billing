"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RabbitMQService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQService = void 0;
const common_1 = require("@nestjs/common");
let RabbitMQService = RabbitMQService_1 = class RabbitMQService {
    logger = new common_1.Logger(RabbitMQService_1.name);
    connection;
    channel;
    async onModuleInit() {
        try {
            const amqplib = require('amqplib');
            const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
            this.connection = await amqplib.connect(url);
            this.channel = await this.connection.createChannel();
            await this.channel.assertExchange('billing', 'topic', { durable: true });
            this.logger.log('RabbitMQ connected');
        }
        catch (error) {
            this.logger.warn('RabbitMQ not available, messaging disabled');
        }
    }
    async onModuleDestroy() {
        try {
            await this.channel?.close();
            await this.connection?.close();
        }
        catch { }
    }
    async publish(exchange, routingKey, message) {
        try {
            if (!this.channel)
                return;
            this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), { persistent: true });
            this.logger.log(`Published ${routingKey}`);
        }
        catch (error) {
            this.logger.error(`Failed to publish ${routingKey}`, error);
        }
    }
};
exports.RabbitMQService = RabbitMQService;
exports.RabbitMQService = RabbitMQService = RabbitMQService_1 = __decorate([
    (0, common_1.Injectable)()
], RabbitMQService);
//# sourceMappingURL=rabbitmq.service.js.map