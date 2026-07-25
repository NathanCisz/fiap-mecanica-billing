import { Payment } from '../../domain/entities/payment.entity';
export interface IPaymentRepository {
    create(payment: Payment): Promise<Payment>;
    findById(id: string): Promise<Payment | null>;
    findByBudgetId(budgetId: string): Promise<Payment[]>;
    update(payment: Payment): Promise<Payment>;
}
export declare const PAYMENT_REPOSITORY = "PAYMENT_REPOSITORY";
