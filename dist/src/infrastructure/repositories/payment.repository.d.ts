import { PrismaService } from '../database/prisma.service';
import { IPaymentRepository } from '../../application/ports/payment.repository.port';
import { Payment } from '../../domain/entities/payment.entity';
export declare class PaymentRepository implements IPaymentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toDomain;
    create(payment: Payment): Promise<Payment>;
    findById(id: string): Promise<Payment | null>;
    findByBudgetId(budgetId: string): Promise<Payment[]>;
    update(payment: Payment): Promise<Payment>;
}
