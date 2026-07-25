export interface IMessagingPort {
    publish(exchange: string, routingKey: string, message: object): Promise<void>;
}
export declare const MESSAGING_PORT = "MESSAGING_PORT";
