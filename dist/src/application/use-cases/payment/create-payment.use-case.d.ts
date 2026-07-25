import { Payment } from '../../../domain/entities/payment.entity';
import { type IPaymentRepository } from '../../ports/payment.repository.port';
import { type IBudgetRepository } from '../../ports/budget.repository.port';
import { type IMessagingPort } from '../../ports/messaging.port';
export interface CreatePaymentInput {
    budgetId: string;
    paymentMethod: string;
}
export declare class CreatePaymentUseCase {
    private readonly paymentRepository;
    private readonly budgetRepository;
    private readonly messaging;
    constructor(paymentRepository: IPaymentRepository, budgetRepository: IBudgetRepository, messaging: IMessagingPort);
    execute(input: CreatePaymentInput): Promise<Payment>;
}
