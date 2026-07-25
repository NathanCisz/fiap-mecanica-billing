export interface IMessagingPort {
  publish(exchange: string, routingKey: string, message: object): Promise<void>;
}

export const MESSAGING_PORT = 'MESSAGING_PORT';
