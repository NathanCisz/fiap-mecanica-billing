import { CreatePaymentUseCase } from '../../application/use-cases/payment/create-payment.use-case';
import { CreatePaymentDto } from '../dtos/payment/create-payment.dto';
import { type IPaymentRepository } from '../../application/ports/payment.repository.port';
export declare class PaymentController {
    private readonly createPaymentUseCase;
    private readonly paymentRepository;
    constructor(createPaymentUseCase: CreatePaymentUseCase, paymentRepository: IPaymentRepository);
    create(dto: CreatePaymentDto): Promise<{
        id: string;
        budgetId: string;
        mercadoPagoId: string | undefined;
        amount: number;
        status: import("../../domain/entities/payment.entity").PaymentStatus;
        paymentMethod: string | undefined;
        paidAt: Date | undefined;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string): Promise<{
        id: string;
        budgetId: string;
        mercadoPagoId: string | undefined;
        amount: number;
        status: import("../../domain/entities/payment.entity").PaymentStatus;
        paymentMethod: string | undefined;
        paidAt: Date | undefined;
        createdAt: Date;
        updatedAt: Date;
    } | undefined>;
    findByBudget(budgetId: string): Promise<{
        id: string;
        budgetId: string;
        mercadoPagoId: string | undefined;
        amount: number;
        status: import("../../domain/entities/payment.entity").PaymentStatus;
        paymentMethod: string | undefined;
        paidAt: Date | undefined;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
